const arr = [
  {
    title: "Space Oddity Shuffle",
    description: "Dance like an alien in zero gravity for 5 minutes.",
    due: "2023-11-10T00:00:00.000Z",
    priority: "low",
  },
  {
    title: "Nap-time Ninja Training",
    description:
      "Take a 15-minute power nap, but do it in stealth mode—no one should notice!",
    due: "2023-11-11T00:00:00.000Z",
    priority: "medium",
  },
  {
    title: "Random Acts of Complimenting",
    description:
      "Compliment three strangers today—bonus points if they're wearing polka dots.",
    due: "2023-11-17T00:00:00.000Z",
    priority: "high",
  },
  {
    title: "Invention Convention",
    description:
      "Devise a new use for a household item. Present your invention to your pet or a houseplant.",
    due: "2023-11-18T00:00:00.000Z",
    priority: "medium",
  },
  {
    title: "Serious Pillow Fort Business",
    description:
      "Construct an epic pillow fort and spend at least an hour plotting world domination from within its cozy walls.",
    due: "2023-11-11T00:00:00.000Z",
    priority: "high",
  },
  {
    title: "Undercover Superhero Mission",
    description:
      "Wear a disguise and do a random act of kindness. Bonus points for capes and mysterious smiles.",
    due: "2023-11-14T00:00:00.000Z",
    priority: "medium",
  },
  {
    title: "Mindful Munching",
    description:
      "Eat your favorite snack, but do it with your eyes closed and savor every flavor. Pretend you're a food critic.",
    due: "2023-11-11T00:00:00.000Z",
    priority: "low",
  },
  {
    title: "Tech-Free Time Travel",
    description:
      "Spend an hour without any electronic devices. Rediscover the lost art of conversation or stare at a wall and contemplate the mysteries of the universe.",
    due: "2023-11-12T00:00:00.000Z",
    priority: "high",
  },
  {
    title: "Dance-off with the Vacuum",
    description:
      "Put on your favorite music and have a dance-off with the vacuum cleaner. Bonus points for creative moves and synchronized spins.",
    due: "2023-11-12T00:00:00.000Z",
    priority: "medium",
  },
  {
    title: "Secret Agent Sock Sorting",
    description:
      "Organize your sock drawer but do it in a way that makes you feel like a secret agent on a critical mission.",
    due: "2023-11-16T00:00:00.000Z",
    priority: "low",
  },
];

arr.forEach((itm) => {
  fetch("http://127.0.0.1:8090/api/collections/todos/records/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itm),
  });
});
