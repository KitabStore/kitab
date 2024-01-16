const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://unntmurvajywlkckfqhx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubnRtdXJ2YWp5d2xrY2tmcWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzNzY1NzQsImV4cCI6MjAxODk1MjU3NH0.3akizo81qHsTkc8JTJEs-J154Lf2CY6VnQ_zjjaecgg');

module.exports={supabase};