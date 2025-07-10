const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { algorithm, visited_steps, path_steps, runtime_ms, grid_size, grid } = body;

    const { data, error } = await supabase
      .from('runs')
      .insert([{ algorithm, visited_steps, path_steps, runtime_ms, grid_size, grid }]);

    if (error) {
      console.error('Insert error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Insert failed', error }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Insert successful', data }),
    };
  } catch (err) {
    console.error('Handler error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error', error: err.message }),
    };
  }
};
