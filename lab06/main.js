function wordLength(s, n) {
  const words = s.split(" ")
  return words.length >= n - 1 ? words[n] : null
}

function harmonicMean(x1, x2, x3) {
  return 3 / (1 / x1 + 1 / x2 + 1 / x3)
}

function squareRoot(value, precision) {
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

function area(p, a) {
  return p * a / 2
}

function Patient(first_name, last_name, middle_name, address, med_card_number, diagnosis) {
  this.first_name = first_name
  this.last_name = last_name
  this.middle_name = middle_name
  this.address = address
  this.med_card_number = med_card_number
  this.diagnosis = diagnosis
}

const patients = [
  new Patient("Keenan", "Sutherland", "Suman", "Address 1", 123456, "Corona Virus"),
  new Patient("Clarence", "Huff", "Mohammed", "Address 2", 123456, "Corona Virus"),
  new Patient("Rosie", "Fowler", "Macsen", "Address 3", 123456, "Corona Virus"),
  new Patient("Ruari", "Finnegan", "Bilal", "Address 4", 123456, "Corona Virus"),
  new Patient("Aqib", "Leblanc", "Macsen", "Address 5", 123456, "Corona Virus"),
  new Patient("Jocelyn", "Chavez", "Salma", "Address 6", 123456, "Corona Virus"),
  new Patient("Husnain", "Powers", "Riley", "Address 7", 123456, "Corona Virus"),
  new Patient("Daanyaal", "Hensley", "Brett", "Address 8", 123456, "Corona Virus"),
  new Patient("Nuha", "Choi", "Naeem", "Address 9", 123456, "Corona Virus"),
  new Patient("Danica", "Pham", "Arooj", "Address 10", 123456, "Corona Virus")
]

console.log(patients)
