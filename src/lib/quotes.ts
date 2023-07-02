export type Quote = (typeof baseQuotes)[number] & {
  quoteb64: string // imgix prefers base64, so we convert on server
  translatedQuote?: string // fallback if ImgIx typesetting fails
}

export const baseQuotes = [
  {
    id: 1,
    title: 'Strive for excellence',
    quote:
      "Our goal is to build a world class product and company. We're a high performance team of top engineering talent, who strive to better ourselves and each other.",
  },
  {
    id: 2,
    title: 'Forward motion',
    quote:
      'Be action-oriented and proactive. Fail early if necessary - we value people who push things forward.',
  },
  {
    id: 3,
    title: 'Technologies follow requirements',
    quote:
      'We introduce new technologies when the time is right: no hype based development! Start small, with a few days of prototyping, and learn from experience, not blogs. Incremental changes are often better than going all the way in.',
  },
  {
    id: 4,
    title: 'Build quality in',
    quote:
      'Quality is paramount: never take shortcuts. We should have confidence that at any given time, our systems are functional and meeting performance, scale and security standards.',
  },
  {
    id: 5,
    title: 'Gain efficiencies',
    quote:
      'Team efficiency is about reducing waste, and cutting down cycle time. Retrospectives are a great tool to spot inefficiencies, reflect on process and improve efficiencies.',
  },
  {
    id: 6,
    title: 'Choose positivity',
    quote:
      'Strive to approach things in a positive and optimistic way. Be conscious about showing genuine appreciation for your team.',
  },
  {
    id: 7,
    title: 'Be open and honest',
    quote:
      "Schedules, bugs, stress, personal challenges, annoyances... get them out into the open! Always be honest. We can't resolve it if we don’t know about it.",
  },
  {
    id: 8,
    title: 'Communicate with clarity',
    quote:
      "Talk, code, design and write in a clear way. We’re a remote team - it’s better to say it twice than let it slip through the cracks. But don't be afraid to get on the phone: a five minute call goes a long way. Remember that context is easily missed with instant messaging. Turn up to meetings prepared.",
  },
  {
    id: 9,
    title: 'Don’t point blame',
    quote:
      'Take responsibility when you mess up. Accept that everyone makes mistakes - we are not a finger-pointing organisation.',
  },
  {
    id: 10,
    title: 'No egos here',
    quote:
      "Don't be precious about your code: feedback is not a personal attack. Have strong opinions, but hold them lightly. Practise humility, gratitude and mutual respect. We don't accept ‘Brilliant Assholes’.",
  },
  {
    id: 11,
    title: 'Be a team player',
    quote:
      "Software development is like rowing: it’s a team sport that requires skill and synchronisation. We're a team and we succeed or fail together.",
  },
  {
    id: 12,
    title: 'Value diversity',
    quote:
      'GetMyBoat values diversity and encourages a culture of respect, listening to and learning from each other. Intolerance simply isn’t tolerated!',
  },
  {
    id: 13,
    title: "It's a marathon, not a sprint",
    quote:
      'In the start-up world, the race goes not to the swiftest, but to those who keep running. A sustainable pace doesn’t mean taking it easy and going slow, it means consistency, and finding time to recuperate energy levels. If you’re feeling burnt out, the balance is off.',
  },
  {
    id: 14,
    title: 'Focus on self-improvement',
    quote:
      'We are all capable of much more than we imagine. Practice activities and develop habits that improve your mind and body and take you out of your comfort zone. Working with great people is a chance to learn, improve your skill-set and up your game. Help others do the same by supporting them and sharing knowledge and resources freely.',
  },
  {
    id: 15,
    title: 'We’re all adults here',
    quote:
      "Team members set their own schedules and work in a way that's best for their productivity. We're self-motivated adults and are treated as such.",
  },
  {
    id: 16,
    title: 'Be punctual',
    quote: 'Meetings start on the dot. Respect other people’s time.',
  },
]
