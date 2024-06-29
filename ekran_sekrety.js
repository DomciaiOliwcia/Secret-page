let secrets = [
  "Udawałem, że interesuję się hobby mojej sympatii, żeby mieć o czym z nią rozmawiać.",
  "Kiedyś stworzyłem fałszywe konto na Instagramie, żeby śledzić i szpiegować mojego byłego/byłą.",
  "Zdjęcie, które wrzuciłem na Instagrama, zostało zrobione miesiące temu, ale udaję, że to z dziś.",
  "Zdarzyło mi się celowo zrobić coś głupiego na TikToku, żeby zdobyć więcej lajków i followersów.",
  "Zawsze czytam wiadomości od razu, ale celowo odpowiadam później, żeby wyglądać na zajętego.",
  "Kiedyś okłamałem znajomych, że mam spotkanie rodzinne, tylko po to, żeby zostać w domu i grać w gry.",
  "Zdarzyło mi się skopiować cudzy tekst na esej, bo brakowało mi czasu i pomysłów.",
  "Mam folder z 'pikantnymi' zdjęciami, które nigdy nikomu nie pokażę.",
  "Zawsze przeszukuję stare profile moich znajomych, żeby znaleźć ich wstydliwe zdjęcia.",
  "W sekrecie uczę się flirtować, oglądając tutoriale na YouTube.",
  "Kiedyś przesłałem flirtującą wiadomość do niewłaściwej osoby i udawałem, że to był żart.",
  "Czasami kłamię na temat tego, ile miałem relacji, żeby zrobić wrażenie na znajomych.",
  "Mam tajne konto na OnlyFans, żeby zarabiać dodatkowe pieniądze.",
  "Kiedyś napisałem sobie pozytywny komentarz z fałszywego konta, żeby poprawić sobie humor.",
  "Zdarza mi się przeglądać profile osób, które kiedyś mi się podobały, żeby zobaczyć, czy są szczęśliwe beze mnie.",
  "Kiedyś odwołałem randkę w ostatniej chwili, bo byłem zbyt nerwowy, żeby się spotkać.",
  "Wysłałem sobie kwiaty do pracy, żeby wyglądało, że mam tajemniczego adoratora.",
  "Zdarzyło mi się upić przed kamerą podczas imprezy online, żeby dodać sobie odwagi.",
  "Podziwiam i śledzę profile osób, które mają życie, jakie chciałbym mieć, ale nigdy się do tego nie przyznam.",
  "Zdarza mi się flirtować online z osobami z innego miasta, żeby nie ryzykować, że spotkam ich w realnym życiu."
];

let playwriteFont, tiny5Font;
let textPositions = [];
let originalPositions = [];
let bgColor = '#F5D7E3';

function preload() {
  playwriteFont = loadFont('PlaywriteNL.ttf');
  tiny5Font = loadFont('Tiny5.ttf'); // Load Tiny5 font
}

function setup() {
  createCanvas(1920, 1080);
  textAlign(CENTER, CENTER);
  let colors = [
    '#3B429F', '#AA7DCE', '#F4A5AE', '#A8577E', 
    '#3B429F', '#AA7DCE', '#F4A5AE', '#A8577E', 
    '#3B429F', '#AA7DCE', '#F4A5AE', '#A8577E', 
    '#3B429F', '#AA7DCE', '#F4A5AE', '#A8577E'
  ];

  background(bgColor);
  textFont(tiny5Font); // Change font to Tiny5
  textSize(24);

  let margin = 50;
  let totalLines = secrets.length;
  let availableHeight = height - 2 * margin;
  let spacing = (availableHeight / (totalLines + 1)) * 1.5; // Increase spacing

  let yOffset = margin + spacing;

  for (let i = 0; i < secrets.length; i++) {
    let words = secrets[i].split('');
    let lineWidth = textWidth(secrets[i]);
    let startX = (width - lineWidth) / 2;

    for (let j = 0; j < words.length; j++) {
      let x = startX + textWidth(secrets[i].substring(0, j));
      let y = yOffset;
      let color = random(colors);
      textPositions.push({ char: words[j], x: x, y: y, ox: x, oy: y, color: color });
    }

    yOffset += spacing;
  }

  // Create forget button
  button = createButton('forget');
  button.style('font-family', 'Tiny5');
  button.style('font-size', '24px');
  button.style('background-color', '#3B429F');
  button.style('color', '#F5D7E3');
  button.style('border', 'none');
  button.style('padding', '20px 40px');
  button.position(width - 250, height - 100);
  button.mousePressed(() => {
    window.open('https://activistgames.github.io/startingPoints', '_blank');
  });

  button.mouseOver(() => {
    button.style('background-color', '#F4A5AE');
  });

  button.mouseOut(() => {
    button.style('background-color', '#3B429F');
  });
}

function draw() {
  background(bgColor);

  for (let i = 0; i < textPositions.length; i++) {
    let tp = textPositions[i];
    fill(tp.color);
    text(tp.char, tp.x, tp.y);
  }
}

function mouseMoved() {
  for (let i = 0; i < textPositions.length; i++) {
    let tp = textPositions[i];
    let d = dist(mouseX, mouseY, tp.x, tp.y);

    if (d < 100) { // Increase detection radius
      tp.x += random(-15, 15); // Increase displacement range
      tp.y += random(-15, 15); // Increase displacement range
    } else {
      tp.x = lerp(tp.x, tp.ox, 0.1);
      tp.y = lerp(tp.y, tp.oy, 0.1);
    }
  }
}
