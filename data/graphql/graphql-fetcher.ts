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

async function asyncFetch(query, variables?: object) {
  // TODO: hook up to database and use to fetch all exercises
  const res = await fetch('/api/graphql', {
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
}

export { fetcher, asyncFetch };
