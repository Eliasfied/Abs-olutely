import localForage from "localforage";
const ExerciseStorage = localForage.createInstance({ name: "Exercises" });

//Exercises

async function loadAll() {
  // await ExerciseStorage.clear();

  await ExerciseStorage.setItem("Plank", {
    name: "Plank",
    img: "@/assets/exercises/Plank.gif",
    difficulty: 3,
    description: "Legen Sie sich flach auf den Bauch und stützen Sie Ihren Körper auf Ihren Unterarmen, während Ihre Ellenbogen direkt unter den Schultern positioniert sind. Heben Sie Ihren Körper an, indem Sie Ihre Zehen auf den Boden legen und Ihren Körper in eine gerade Linie bringen. Spannen Sie dabei Ihre Bauchmuskeln und Ihren Po an.",
    muscleGroup: "core",
    number: "9.",
  });

  await ExerciseStorage.setItem("Crunch", {
    name: "Crunch",
    img: "@/assets/exercises/Crunch.gif",
    difficulty: 3,
    description: "Legen Sie sich flach auf den Rücken und ziehen sie die Beine im 90 Grad Winkel an und verschränken sie die Hände hinter dem Kopf. Heben Sie Kopf und Schultern vom Boden ab, während Sie die Bauchmuskeln anspannen und das Kinn leicht zur Brust ziehen. Atmen Sie aus, während Sie sich krümmen, und halten Sie diese Position kurz, bevor Sie langsam wieder in die Ausgangsposition zurückkehren.",
    muscleGroup: "upper-abs",
    number: "3.",
  });

  await ExerciseStorage.setItem("Grab-Toe", {
    name: "Grab-Toe",
    img: "@/assets/exercises/Grab-Toe.gif",
    difficulty: 3,
    description: "Setzen Sie sich mit ausgestreckten Beinen auf den Boden und strecken Sie die Arme nach vorne aus. Heben Sie den Oberkörper an und bringen Sie gleichzeitig die Hände zu den Zehen, indem Sie Ihre Bauchmuskeln anspannen. Halten Sie diese Position kurz, bevor Sie langsam wieder in die Ausgangsposition zurückkehren." ,
    muscleGroup: "core",
    number: "4.",
  });

  await ExerciseStorage.setItem("Hold", {
    name: "Hold",
    img: "@/assets/exercises/Hold.gif",
    difficulty: 3,
    description: "Setzen Sie sich auf den Boden und strecken sie beide Beine aus und halten sie diese über dem Boden. Bringen Sie Ihren Oberkörper ein Stück nach oben und halten sie diese Position.",
    muscleGroup: "core",
    reorderID: 0,
    number: "6.",
  });

  await ExerciseStorage.setItem("Mountain Climber", {
    name: "Mountain Climber",
    img: "@/assets/exercises/Mountain Climber.gif",
    difficulty: 3,
    description: "Positionieren Sie sich in einer Liegestützposition mit gestreckten Armen und Händen auf Schulterhöhe, während Sie Ihre Beine in einer geraden Linie hinter sich ausstrecken. Bringen Sie das rechte Knie zur Brust und setzen Sie den Fuß auf dem Boden ab, bevor Sie das linke Knie zur Brust bringen und den Fuß auf dem Boden absetzen. Fahren Sie fort, indem Sie abwechselnd schnell und kontrolliert Ihre Knie zur Brust bringen, als ob Sie bergauf klettern würden. Achten Sie darauf, dass Ihr Körper während der Bewegung in einer geraden Linie bleibt.",
    muscleGroup: "core",
    number: "8.",
  });

  await ExerciseStorage.setItem("Puls Ups", {
    name: "Puls Ups",
    img: "@/assets/exercises/Puls-Ups.gif",
    difficulty: 3,
    description: "Legen sie sich auf den Rücken. Beugen Sie die Knie und heben Sie die Beine an, sodass Ihre Schienbeine parallel zum Boden sind. Nun drücken Sie Ihr Gesäß gerade nach oben und ziehen diesen langsam wieder zurück. Wiederholen Sie diese Bewegung.",
    muscleGroup: "core",
    number: "10.",
  });

  await ExerciseStorage.setItem("Russian Twist", {
    name: "Russian Twist",
    img: "@/assets/exercises/Russian Twist.gif",
    difficulty: 3,
    description: "Setzen Sie sich auf eine Matte oder den Boden und beugen Sie die Knie, während die Beine leicht angewinkelt in der Luft schweben. Lehnen Sie sich leicht zurück, während Sie Ihren Oberkörper vom Boden abheben und eine V-Form zwischen Ihrem Oberkörper und den Oberschenkeln bilden. Drehen Sie Ihren Oberkörper langsam zur rechten Seite und berühren Sie den Boden neben Ihrem Körper mit Ihren Händen, bevor Sie zur linken Seite drehen und den gleichen Vorgang ausführen.",
    muscleGroup: "side-abs",
    number: "12.",
  });

  await ExerciseStorage.setItem("Side-Plank", {
    name: "Side-Plank",
    img: "@/assets/exercises/Side-Plank.gif",
    difficulty: 3,
    description: "Legen Sie sich seitlich auf eine Matte oder den Boden, wobei Ihr unterer Arm gestreckt ist und Ihre Handfläche auf dem Boden ruht. Strecken Sie Ihre Beine aus und stapeln Sie sie übereinander. Heben Sie Ihren Körper an, indem Sie Ihren Unterarm auf dem Boden stützen und Ihren Körper in einer geraden Linie halten. Vermeiden Sie es, den Rücken durchzuhängen oder den Po nach oben zu strecken.",
    muscleGroup: "side-abs",
    reorderID: 0,
    number: "14.",
  });

  // await ExerciseStorage.setItem("Leg Lower", {
  //   name: "Leg Lower",
  //   img: "@/assets/exercises/Leg Lower.gif",
  //   difficulty: 3,
  //   description: "blablablablablabla",
  //   muscleGroup: "lower-abs",
  //   reorderID: 0,

  // });

  await ExerciseStorage.setItem("V-Up", {
    name: "V-Up",
    img: "@/assets/exercises/V-Up.gif",
    difficulty: 3,
    description: "Legen Sie sich flach auf den Rücken und strecken Sie Ihre Arme über Ihren Kopf aus. Heben Sie gleichzeitig Ihre Beine und Ihren Oberkörper an und bringen Sie Ihre Hände und Füße in der Mitte Ihres Körpers zusammen, um eine V-Form zu bilden. Wiederholen Sie die Bewegung und achten Sie darauf, dass Sie Ihre Bauchmuskeln anspannen und den Schwung ausnutzen.",
    muscleGroup: "core",
    number: "15.",
  });

  await ExerciseStorage.setItem("Reverse Crunch", {
    name: "Reverse Crunch",
    img: "@/assets/exercises/Reverse Crunch.gif",
    difficulty: 3,
    description: "Legen Sie sich flach auf den Rücken und platzieren Sie die Hände auf beiden Seiten des Körpers. Beugen Sie die Knie und heben Sie die Beine an, sodass Ihre Schienbeine parallel zum Boden sind. Spannen Sie Ihre Bauchmuskeln an und heben Sie Ihr Gesäß vom Boden ab, indem Sie Ihre Beine zum Oberkörper ziehen.",
    muscleGroup: "lower-abs",
    number: "11.",
  });

  await ExerciseStorage.setItem("Heel Taps", {
    name: "Heel Taps",
    img: "@/assets/exercises/Heel Taps.gif",
    difficulty: 3,
    description: "Legen Sie sich flach auf den Rücken und beugen Sie die Knie, während Sie die Füße flach auf dem Boden lassen und die Hände auf beiden Seiten des Körpers ausstrecken. Berühren Sie abwechselnd mit der linken Ferse und der rechten Ferse den Boden, indem Sie das jeweilige Bein ausstrecken, während Sie die Bauchmuskeln anspannen. Halten Sie das Becken stabil und vermeiden Sie es, den Rücken vom Boden abzuheben. ",
    muscleGroup: "side-abs",
    reorderID: 0,
    number: "5.",
  });

  await ExerciseStorage.setItem("Bicycle", {
    name: "Bicycle",
    img: "@/assets/exercises/Bicycle.gif",
    difficulty: 3,
    description:
      "Legen Sie sich auf den Rücken und heben Sie die Beine vom Boden ab, während Sie die Hände hinter dem Kopf verschränken. Bringen Sie das rechte Knie zum linken Ellenbogen und strecken Sie das linke Bein aus, bevor Sie die Seite wechseln und das linke Knie zum rechten Ellenbogen bringen. Wiederholen Sie diese Bewegung abwechselnd, als ob Sie Fahrrad fahren. Achten Sie darauf, die Spannung in den Bauchmuskeln aufrechtzuerhalten.",
    muscleGroup: "lower-abs",
    number: "1.",
  });

  await ExerciseStorage.setItem("Scissors", {
    name: "Scissors",
    img: "@/assets/exercises/Scissors.gif",
    difficulty: 3,
    description: "Legen Sie sich flach auf den Rücken und platzieren Sie die Hände auf beiden Seiten des Körpers. Heben Sie beide Beine in einem Winkel von etwa 45 Grad zum Boden an. Spannen Sie Ihre Bauchmuskeln an und kreuzen Sie das rechte Bein über das linke, bevor Sie die Position wechseln und das linke Bein über das rechte kreuzen.",
    muscleGroup: "lower-abs",
    number: "13.",
  });

  await ExerciseStorage.setItem("Knee to Abs", {
    name: "Knee to Abs",
    img: "@/assets/exercises/Knee to Abs.gif",
    difficulty: 3,
    description: "Setzen Sie sich auf den Boden, ziehen Sie die Beine zum Körper und halten lehnen Sie sich auf ihre Hände. Stecken Sie nun die Beine aus ohne dass diese den Boden berühren und bringen Sie ihren Unterkörper zum Boden und lehnen Sie sich auf ihre Ellenbogen.",
    muscleGroup: "upper-abs",
    number: "7.",
  });

  await ExerciseStorage.setItem("Cross Crunches", {
    name: "Cross Crunches",
    img: "@/assets/exercises/Cross Crunches.gif",
    difficulty: 3,
    description: "Legen Sie sich flach auf den Rücken und beugen Sie die Knie, während Sie die Füße flach auf dem Boden lassen und die Hände hinter dem Kopf verschränken. Heben Sie Kopf und Schultern vom Boden ab und bringen Sie das rechte Ellbogen zum linken Knie, bevor Sie die Seite wechseln und das linke Ellbogen zum rechten Knie bringen. Wiederholen Sie diese Bewegung abwechselnd und achten Sie darauf, dass Sie Ihre Bauchmuskeln während der Bewegung anspannen.",
    muscleGroup: "side-abs",
    number: "2.",
  });
}

loadAll();

//workouts

export default ExerciseStorage;
