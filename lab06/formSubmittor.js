$(function () {
  $("#task1-form").on("submit", function (e) {
    e.preventDefault()
    const s = $(this).find("input[name='s']").val()
    const n = $(this).find("input[name='n']").val()
    try {
      $(this).find(".result").text(wordLength(s, n))
    } catch (e) {
      $(this).find(".result").text(e)
    }
  })

  $("#task2-form").on("submit", function (e) {
    e.preventDefault()
    const x1 = $(this).find("input[name='x1']").val()
    const x2 = $(this).find("input[name='x2']").val()
    const x3 = $(this).find("input[name='x3']").val()
    try {
      $(this).find(".result").text(harmonicMean(x1, x2, x3))
    } catch (e) {
      $(this).find(".result").text(e)
    }
  })

  $("#task3-form").on("submit", function (e) {
    e.preventDefault()
    const x = $(this).find("input[name='x']").val()
    const n = $(this).find("input[name='n']").val()
    try {
      $(this).find(".result").text(squareRoot(x, n))
    } catch (e) {
      $(this).find(".result").text(e)
    }
    $(this).find(".result-2").text(Math.sqrt(x))
  })

  $("#task4-form").on("submit", function (e) {
    e.preventDefault()
    const a = $(this).find("input[name='a']").val()
    const n = $(this).find("input[name='n']").val()
    try {
      $(this).find(".result").text(area(a, n))
    } catch (e) {
      $(this).find(".result").text(e)
    }
  })

  $("#task5-form").on("submit", function (e) {
    e.preventDefault()
    const diagnosis = $(this).find("input[name='diagnosis']").val()
    const intervalFrom = $(this).find("input[name='med_card_from']").val()
    const intervalTo = $(this).find("input[name='med_card_to']").val()

    const filteredPatients = patients.filter(p => {
      let res = true
      if (diagnosis.length > 0)
        res = res && p.diagnosis.toLowerCase().replace(/\s/g, '').includes(diagnosis.toLowerCase())

      if (intervalFrom.length > 0 && intervalTo.length > 0)
        res = res && p.med_card_number >= parseInt(intervalFrom) && p.med_card_number <= parseInt(intervalTo)

      return res
    })
    addPatientsToHtml(filteredPatients)
  })

  addPatientsToHtml(patients)
})
