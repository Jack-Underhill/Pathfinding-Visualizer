const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async (event) => {
  const algo = event.queryStringParameters.algorithm;
  const grid = event.queryStringParameters.grid;
  
  if (!algo) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing algorithm query param' })
    };
  }

  const { data, error } = await supabase
    .from('runs')
    .select('*')
    .eq('algorithm', algo)
    .eq('grid', grid)
    .order('timestamp', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Supabase error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch runs' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Fetch successful', data })
  };
};
