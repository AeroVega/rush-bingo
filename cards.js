// Rush Bingo square text. Edit the quoted lines to customize your cards.

const shared = [
  "Someone has a Rush-themed tattoo.",
  "Canadian flag spotted.",
  "RUSH SCHOLAR",
  "OLD-SCHOOL FAN",
  "GEAR NERD",
  "Someone explains something about Rush to their partner.",
  "Someone mentions Ayn Rand.",
  "Someone references The Professor.",
  "Someone says “time signature.”",
  "Someone mentions Peart’s lyrics.",
  "Someone refers to Rush as “prog”.",
  "Someone has Geddy Lee hair and glasses."
];

const connieOnly = [
  "Someone brags about seeing Rush in the ’70s or ’80s.",
  "Someone is wearing extremely old Rush merchandise.",
  "Someone has a Rush jacket or vest covered in patches.",
  "Someone is wearing something that references a specific Rush album rather than the band generally.",
  "SUBDIVISIONS is played.",
  "FREEWILL is played.",
  "RED BARCHETTA is played.",
  "NEW WORLD MAN is played.",
  "The entirety of MOVING PICTURES is played.",
  "Anika drops a stick.",
  "Alex gets an extended spotlight.",
  "Someone tells a story about seeing Neil perform."
];

const brandonOnly = [
  "Someone claims to have seen Rush an impressive number of times.",
  "Someone is wearing extremely old Rush merchandise.",
  "Someone has a Rush jacket or vest covered in patches.",
  "Someone is wearing Neil Peart’s brimless kufi hat.",
  "CLOSER TO THE HEART is played.",
  "FLY BY NIGHT is played.",
  "FORCE TEN is played.",
  "THE TREES is played.",
  "THE ANALOG KID is played.",
  "Anika gets a solo/extended drum spotlight.",
  "Someone says they were skeptical about Anika.",
  "Geddy gets visibly emotional."
];

function shuffle(array, seed) {
  let x = seed;
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    x = (x * 1664525 + 1013904223) >>> 0;
    const j = x % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const RUSH_BINGO_CARDS = {
  connie: shuffle(shared.concat(connieOnly), 5030),
  brandon: shuffle(shared.concat(brandonOnly), 7106)
};
