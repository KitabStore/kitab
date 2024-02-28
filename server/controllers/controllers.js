const {connection, supabase}=require("../model/webDB");
const jwt=require('jsonwebtoken');
const cookie=require('cookie-parser');
const bcrypt=require('bcrypt');
const { createClient } = require('@supabase/supabase-js');
//methods



const maxAge=3*24*60*60;
const createtoken = (token)=>{
    return jwt.sign({token},'user secret',{
        expiresIn:maxAge
    })
}

async function checkexistance(email,callback){
    const { data, error } = await supabase
    .from('Users')
    .select('userid')
    .eq('email', email)
    
    console.log(data);

    if(error){
        console.error('Error checking existed email in database:', error);
    }

    if(data.length>0){
        return callback({ error: 'account exists' }, null);
    }
    return  callback(null, null);
}

async function login(username, password, callback) {
  try {
    const { data: users, error } = await supabase
      .from('Users')
      .select('*')
      .eq('username', username);

    if (error) {
      console.error('Error getting user to login:', error);
      callback({ error: 'login failed' }, null);
      return;
    }

    if (users.length > 0) {
      const user = users[0];
     // console.log(user);

      const auth = await bcrypt.compare(password, user.password);

      if (auth) {
        const token = createtoken(user.userid);
        callback(null, { user, token });
      } else {
        callback({ error: 'incorrect password' }, null);
      }
    } else {
      callback({ error: 'incorrect username' }, null);
    }
  } catch (error) {
    console.log('Error in login method:', error);
  }
}



async function addTojoinedtable(oid,bid,qte,price){

  try{

    const { data: OB, error } = await supabase
  .from('orderbook')
  .select('*')
  .eq('orderid', oid)
  .eq('bookid', bid);

  if (error) {
    console.error('Error selecting from joined table orderbook:', error.message);
    return;
  }
  if(OB.length<=0){
    const { data: insertResult, error: insertError } = await supabase
    .from('orderbook')
    .insert([
      {
        orderid: oid,
        bookid: bid,
        quantity: qte,
        price: price,
      },
    ]);

  if (insertError) {
    console.error('Error inserting in joined table orderbook:', insertError.message);
    return;
  }
  }
else{
  const { data, error } = await supabase
  .rpc('increment', { x: OB[0].quantity+qte, y:OB[0].price+price , order_id: oid, book_id: bid });
}

} catch (err) {
console.error('Unexpected error in addTojoinedtable method:', err);
return;
}
  
}


//controllers


module.exports.post_signup=(req,res)=>{
    const {username,phone,location,email,password}=req.body;

    checkexistance(email,async (error,result)=>{
        if(error){
            return  res.status(201).json( error );
        }else{
          let salt=await bcrypt.genSalt();
          pass=await bcrypt.hash(password,salt);
         // console.log("pass:",pass);
            const { data, error} = await supabase
                                        .from('Users') 
                                        .insert([
                                           {
                                             username: username,
                                             phone:phone,
                                             location:location,
                                             email:email,
                                             password: pass,
                                           }
                                         ]).select();
             if (error) {
              console.error('Error inserting new user:', error);
              return res.status(201).json({ error:"failed signUp" });
            } else {
              console.log('User inserted:',data);
              res.status(201).json({ logged:false });
              }
        }
       
    });


}

module.exports.post_login=async(req,res)=>{
  const {username,password}=req.body;
  try{
    login(username,password,(error,result)=>{
      if (error) {
          return res.status(500).json(error);
      } else {
         const { user, token } = result;
         // console.log("in login controller:",user);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure:true ,sameSite: 'None'});
          res.status(201).json({ user ,logged:true});
      }
  })
  }catch(err){
    console.log(err);
    return res.status(500).json({err});
  }
   
}

module.exports.get_logout=async(req,res)=>{
  res.cookie('jwt','',{httpOnly:true,maxAge:0, secure:true ,sameSite: 'None'});
 //res.clearCookie('jwt').send();
  res.status(201).json({ logged:false });
}

module.exports.postBooks = async (req, res) => {
  const { category, isbn } = req.body;

  //return books based on category with stock quantity > 0s 
  if (category) {
    const { data, error } = await supabase
      .from('Books')
      .select('*')
      .eq('category', category)
      .not('quantity','eq',0);

    if (error) {
      console.error('Error getting category books:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length <= 0) {
      return res.status(404).json({ error: 'Category does not exist' });
    }

    return res.status(200).json({ data });
  }

  // return a single book
  if (isbn) {
    const { data, error } = await supabase
      .from('Books')
      .select('*')
      .eq('isbn', isbn);

    if (error) {
      console.error('Error getting book:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length <= 0) {
      return res.status(404).json({ error: 'Book does not exist' });
    }

    return res.status(200).json({ data });
  }

  //if id and category are not provided,return all books with stock quantity > 0
  
  const { data, error } = await supabase
    .from('Books')
    .select('*')
    .not('quantity', 'eq', 0);

  if (error) {
    console.error('Error getting all books:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  return res.status(200).json({ data });
};

module.exports.get_allcategories=async (req,res)=>{
    const {data,error}=await supabase
                            .from('unique_categories_view')
                            .select("categorie");

     const Categories = data.map(item => item.categorie);
                            
    if(error){
        console.error('Error getting all categories:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log(Categories);
    return res.status(201).json({ Categories });
}

//search books

module.exports.get_searchResult=async (req,res)=>{
    input=req.params.input;
    const { data, error } = await supabase
  .from('Books')
  .select()
  .ilike('title', `%${input.toLowerCase()}%`);
  if(error){
    console.error('Error getting search result:', error);
    return res.status(500).json({ error: 'getting search result failed' });
  }
  console.log(data);
    return res.status(201).json({ data });
  
}

module.exports.post_searchResult=async (req,res)=>{
  let {input}=req.body;
  const { data, error } = await supabase
.from('Books')
.select()
.ilike('title', `%${input.toLowerCase()}%`);
if(error){
  console.error('Error getting search result:', error);
  return res.status(500).json({ error: 'getting search result failed' });
}
console.log(data);
  return res.status(201).json({ data });

}

module.exports.get_cart=async (req,res)=>{
  let uid=req.decodedtoken.token;
 //let uid=13;
  let {data:uorder,error:oerror}=await supabase
                                       .from('Order')
                                       .select("orderid,totaleprice")
                                       .eq("userid",uid)
                                       .eq("ordered",false);
   
   if (oerror) {
     console.error('Error getting order in get cart:',oerror);
     return res.status(500).json({ error:"failed getting order" });
   }
   console.log("order in get cart",uorder);

   currentorder=uorder[0].orderid;
  let oid=uorder[0].orderid;
  let totaleprice=uorder[0].totaleprice; 

  console.log("oid in get cart:",oid);
  console.log("totale price in get cart",totaleprice);

  let {data,error}=await supabase
                         .from('BookOrder')
                         .select("*")
                         .eq("orderid",oid);
 
   if (error) {
     console.error('Error getting order books in get cart:',error);
     return res.status(500).json({ error:"failed getting books of order" });
   }
   console.log("books in get cart",data);

   return res.status(201).json({logged:true,data});
               
}

module.exports.delete_from_cart=async (req,res)=>{
   let bookid=req.params.id;

   console.log("current order in deleting order",currentorder);
   if(currentorder){
     //get the specified order
     let{data:uorder,error:erroro}=await supabase
   .from('Order')
   .select('*')
   .eq('orderid',currentorder);

   //delete item from orderbook
   let {data,error:errorob} =await supabase
               .from('BookOrder')
               .delete()
               .eq('isbn',bookid)
               .eq('orderid',currentorder)
               .select();

   if (errorob) {
     console.error('Error deleting in orderbook:', errorob);
     return res.status(500).json({ error:"failed deleting from your order" });
   }
   console.log(data);

   price=data[0].price;

   //update totale price of the order
   let {data:Uorder,error} =await supabase
               .from('Order')
               .update({
                 totaleprice: uorder[0].totaleprice - price
               })
               .eq('orderid',currentorder)
               .select();

   if (error) {
     console.error('Error updating in order table:', error);
     return res.status(500).json({ error:"failed deleting from your order" });
}
   return res.status(201).json({order:Uorder});
   }
   
   console.log("current order:",currentorder);
   return res.status(500).json("intenal problem server");
   

}