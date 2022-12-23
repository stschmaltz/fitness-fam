const fetcher = (query: string, variables?: object) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

async function asyncFetch(query: string, variables?: object) {
  const fetchUrl = process.env.AUTH0_BASE_URL
    ? `${process.env.AUTH0_BASE_URL}/api/graphql`
    : '/api/graphql';

  try {
    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();
    if (json.errors) {
      throw new Error('Failed to fetch API');
    }
    return json.data;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) console.log(error.message);
    throw error;
  }
}

export { fetcher, asyncFetch };
