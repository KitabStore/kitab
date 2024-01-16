import { useEffect, useState } from "react"

const useQuote = async () => {
    const [quote, setQuote] = useState(null);
    useEffect(() => {
        fetch("https://api.api-ninjas.com/v1/quotes?category=knowledge", {
            headers: {
                'X-Api-Key': 'JAyhIZq2mgUFK12muUIw+w==KgsSJSVaH5rzVIeF',
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setQuote(data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    return <>{quote && <p className='h3'>{quote.quote}</p>}</>;
};

export default useQuote;