const url = 'https://recruitment-test.flip.id/frontend-test';
export const getTransactionList = () => {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log({json});
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};
