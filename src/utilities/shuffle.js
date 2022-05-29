// Combine and shuffle two arrays.
const shuffle = () => {
  const assets = [
    { image: '/assets/1.png' },
    { image: '/assets/2.png' },
    { image: '/assets/3.png' },
    { image: '/assets/4.png' },
    { image: '/assets/5.png' },
    { image: '/assets/6.png' }
  ];
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() })); // Add a random ID to each card
};

export default shuffle;
