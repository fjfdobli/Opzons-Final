const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://iyjfpkcxwljfkxbjagbd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5amZwa2N4d2xqZmt4YmphZ2JkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjY2ODk3NSwiZXhwIjoyMDU4MjQ0OTc1fQ.m3Zt4gdwgkvtiqKoz51fqsiSf2Os7W7J8sZccxSwit4'

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;