export const reports = [
  {
    category: "category 1",
    isUrgent: false,
    description: "An report writed to check tests",
    peopleRelated: ["teste1@gmail.com", "teste2@gmail.com"],
    occurenceDates: [new Date(), new Date("2021-04-01")],
    attaches: [],
    id: "c6170afc-31f7-4b43-853f-392f1b1b3f2b",
    answers: [
      {
        content: "Here are an answer",
        attachments: [],
        author: { name: "Company name" },
      },
    ],
    complaintor: {},
  },
  {
    category: "category 2",
    isUrgent: true,
    description: "Another report writed to check tests",
    peopleRelated: ["teste1@gmail.com", "teste2@gmail.com", "teste3@gmail.com"],
    occurenceDates: [new Date(), new Date("2021-04-01")],
    attaches: [],
    id: "456603c3-100a-4469-8dc4-763548b707a2",
    answers: [
      {
        content: "Here are an answer",
        attachments: [],
        author: { name: "Company name" },
      },
      {
        content: "Here are an inner answer",
        attachments: [],
        author: {
          name: "Descassito",
        },
      },
    ],
    complaintor: {
      name: "Descassito",
      birthdate: new Date("1994-06-24"),
      cpf: "03038805033",
      mail: "cassiusavila@gmail.com",
      phone: "51993676234",
    },
  },
];
