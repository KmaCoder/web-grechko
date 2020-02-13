function wordLength(s, n) {
  const words = s.split(" ")
  console.log(words)
  if (words.length <= n)
    throw Error("N is too big")
  return words[n].length
}

function harmonicMean(x1, x2, x3) {
  return 3 / (1 / x1 + 1 / x2 + 1 / x3)
}

function squareRoot(value, precision) {
  value = parseInt(value)
  if (value < 0)
    throw Error("Value is < 0")
  if (value === 0)
    return 0

  function calcSeedVal(value, precision) {
    let a = 0
    let result = 0

    if (value > 9) {
      a = value / Math.pow(10, precision)

      if (a >= 10) {
        result = 600//6 * (Math.pow(10,2));
      } else {
        result = 100
      }
    } else {
      result = value / 10
    }

    return result
  }

  let result = calcSeedVal(value, precision)

  for (let i = 0; i < precision; i++) {
    result = (0.5) * (result + (value / result))
  }

  return result
}

function area(a, n) {
  return n * a * a / (4 * Math.tan(1 / n * Math.PI))
}

class Patient {
  constructor(first_name, last_name, middle_name, address, med_card_number, diagnosis) {
    this.first_name = first_name
    this.last_name = last_name
    this.middle_name = middle_name
    this.address = address
    this.med_card_number = med_card_number
    this.diagnosis = diagnosis
  }

  toHtml() {
    return (
      `<tr class="patient">
          <td>${this.first_name}</td>
          <td>${this.last_name}</td>
          <td>${this.middle_name}</td>
          <td>${this.address}</td>
          <td>${this.med_card_number}</td>
          <td>${this.diagnosis}</td>
       </tr>`)
  }
}

const patients = [
  new Patient("Keenan", "Sutherland", "Suman", "Address 1", 123456, "Corona Virus"),
  new Patient("Clarence", "Huff", "Mohammed", "Address 2", 123457, "Gryp"),
  new Patient("Rosie", "Fowler", "Macsen", "Address 3", 123458, "Zastuda"),
  new Patient("Ruari", "Finnegan", "Bilal", "Address 4", 123459, "Svynka"),
  new Patient("Aqib", "Leblanc", "Macsen", "Address 5", 123460, "Ebola"),
  new Patient("Jocelyn", "Chavez", "Salma", "Address 6", 123461, "AIDS"),
  new Patient("Husnain", "Powers", "Riley", "Address 7", 123462, "Bronhit"),
  new Patient("Daanyaal", "Hensley", "Brett", "Address 8", 123463, "Virus 1"),
  new Patient("Nuha", "Choi", "Naeem", "Address 9", 123464, "Virus 2"),
  new Patient("Danica", "Pham", "Arooj", "Address 10", 123465, "Virus 3")
]

function addPatientsToHtml(data) {
  const html = data.map(p => p.toHtml())
  $(".patients").html(html)
}
