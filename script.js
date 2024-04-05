let participants = [
  {
    name: "Bruno Mazeto",
    email: "brunosantosmazeto@gmail.com",
    enrollmentDate: new Date(2023, 12, 28, 21, 0),
    checkInDate: null,
  },
  {
    name: "João Silva",
    email: "joazinho@gmail.com",
    enrollmentDate: new Date(2023, 11, 23, 11, 32),
    checkInDate: new Date(2023, 11, 25, 8, 54),
  },
  {
    name: "Maria Santos",
    email: "marias@gmail.com",
    enrollmentDate: new Date(2023, 10, 15, 14, 20),
    checkInDate: new Date(2023, 10, 20, 9, 15),
  },
  {
    name: "Pedro Almeida",
    email: "pedroa@gmail.com",
    enrollmentDate: new Date(2023, 9, 8, 16, 45),
    checkInDate: new Date(2023, 9, 15, 10, 30),
  },
  {
    name: "Ana Oliveira",
    email: "anaoliveira@gmail.com",
    enrollmentDate: new Date(2023, 8, 12, 10, 10),
    checkInDate: null,
  },
  {
    name: "Lucas Pereira",
    email: "lucaspereira@gmail.com",
    enrollmentDate: new Date(2023, 7, 3, 13, 25),
    checkInDate: new Date(2023, 7, 9, 14, 35),
  },
  {
    name: "Carla Costa",
    email: "carlacosta@gmail.com",
    enrollmentDate: new Date(2023, 6, 21, 8, 50),
    checkInDate: new Date(2023, 6, 29, 12, 40),
  },
  {
    name: "Rafaela Santos",
    email: "rafaelas@gmail.com",
    enrollmentDate: new Date(2023, 5, 17, 17, 15),
    checkInDate: null,
  },
  {
    name: "Gustavo Lima",
    email: "gustavolima@gmail.com",
    enrollmentDate: new Date(2023, 4, 10, 10, 5),
    checkInDate: new Date(2023, 4, 15, 9, 10),
  },
  {
    name: "Fernanda Souza",
    email: "fernandasouza@gmail.com",
    enrollmentDate: new Date(2023, 3, 4, 12, 30),
    checkInDate: new Date(2023, 3, 10, 15, 20),
  },
]

const createNewParticipant = (participant) => {
  const enrollmentDate = dayjs(Date.now()).to(participant.enrollmentDate)

  let checkInDate = dayjs(Date.now()).to(participant.checkInDate)

  // condicional
  if (participant.checkInDate == null) {
    checkInDate = `
      <button 
        data-email="${participant.email}" 
        onclick="makeCheckIn(event)">
        Confirmar Check-in
      </button>`
  }

  return `
    <tr>
      <td>
        <strong>${participant.name}</strong>
        <br>
        <small>${participant.email}</small>
      </td>
      <td>${enrollmentDate}</td>
      <td>${checkInDate}</td>
    </tr>
    `
}

const updateList = (participants) => {
  let output = ""
  for (let participant of participants) {
    output = output + createNewParticipant(participant)
  }
  document.querySelector("tbody").innerHTML = output
}

updateList(participants)

const addParticipants = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participant = {
    name: formData.get("nome"),
    email: formData.get("email"),
    enrollmentDate: new Date(),
    checkInDate: null,
  }

  const isUserExist = participants.find((p) => {
    return p.email == participant.email
  })

  if (isUserExist) {
    alert("Oops! Parece que esse email já foi cadastrado!")
    return
  }

  participants = [participant, ...participants]
  updateList(participants)

  // clean form
  event.target.querySelector('[name = "nome"]').value = ""
  event.target.querySelector('[name = "email"]').value = ""
}

const makeCheckIn = (event) => {
  const message = "Tem certeza que deseja fazer o check-in?"

  if (confirm(message) === false) {
    return
  }

  const participant = participants.find((p) => {
    return p.email == event.target.dataset.email
  })
  participant.checkInDate = new Date()
  updateList(participants)
}
