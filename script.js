        fetch('https://my.api.mockaroo.com/customers.json', {
                method: 'GET',
                headers: {
                    'X-API-Key': '873acd60'
                }
            }).then(response => response.json())
            .then(data => {

                var database = data





                //KOD DO TABELKI
                var kod = "<table><tr>"

                for (var prop in database[0]) {
                    kod = kod + "<th>"
                    kod = kod + prop
                    kod = kod + "</th>"
                }

                kod = kod + "</tr>"

                for (var i = 0; i < database.length; i++) {
                    kod = kod + "<tr>";
                    //Object.keys(myObj).length
                    for (var j = 0; j < Object.keys(database[i]).length; j++) {
                        kod = kod + "<td>"
                        kod = kod + Object.values(database[i])[j]
                        kod = kod + "</td>"
                    }
                    kod = kod + "</tr>"
                }
                var kod = kod + "</table>"
                document.getElementById('tabelka').innerHTML = kod

                //KOD DO TABELKI - KONIEC


                //WYKRES KOŁO


                            // Kod zliczający ile klientow jest z danego panstwa i przypisanie do tablicy
                            let talllica = [0, 0, 0, 0, 0]
                            for (var i = 0; i < 100; i++) {
                                if (Object.values(database[i])[2] == "Poland") {
                                    talllica[0]++
                                } else if (Object.values(database[i])[2] == "Germany") {
                                    talllica[1]++
                                } else if (Object.values(database[i])[2] == "France") {
                                    talllica[2]++
                                } else if (Object.values(database[i])[2] == "Czech Republic") {
                                    talllica[3]++
                                } else if (Object.values(database[i])[2] == "Lithuania") {
                                    talllica[4]++
                                }
                            }

                            var ctx = document.getElementById("myChart").getContext("2d");
                            var myChart = new Chart(ctx, {
                                type: 'doughnut',
                                data: {
                                    labels: ["Poland", "Germany", "France", "Czech Republic", "Lithuania"],
                                    datasets: [{
                                        data: talllica,
                                        backgroundColor: [
                                            'rgb(139,0,0, 0.9)',
                                            'rgb(52,1,63, 0.9)',
                                            'rgba(0,100,0, 0.9)',
                                            'rgba(0,0,128, 0.9)',
                                            'rgba(139, 128, 0, 0.9)'
                                        ],
                                        borderColor: [
                                            'rgb(139,0,0, 1)',
                                            'rgb(52,1,63, 1)',
                                            'rgba(0,100,0, 1)',
                                            'rgba(0,0,128, 1)',
                                            'rgba(139, 128, 0, 1)'
                                        ],
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            fontColor: 'black'
                                        }
                                    },
                                    title: {
                                        display: true,
                                    }
                                }
                            });
                            

                //WYKRES KOŁO KONIEC

                //WYKRES Podwójny
                        //kod zliczajacy srednia zarobków dla danego wieku i liczbe osob w danym wieku
                        let sum = [0, 0, 0, 0, 0]
                        let count_people = [0, 0, 0, 0, 0]
                        for (var i = 0; i < 100; i++) {
                            number = Object.values(database[i])[3]
                            switch (true) {
                                case (number >= 18 && number <= 25):
                                    sum[0] += toFloat(Object.values(database[i])[8])
                                    console.log(toFloat(Object.values(database[i])[8]))
                                    count_people[0]++
                                    break;

                                case (number > 25 && number <= 35):
                                    sum[1] += toFloat(Object.values(database[i])[8])
                                    count_people[1]++
                                    break;

                                case (number > 35 && number <= 45):
                                    sum[2] += toFloat(Object.values(database[i])[8])
                                    count_people[2]++
                                    break;

                                case (number > 45 && number <= 55):
                                    sum[3] += toFloat(Object.values(database[i])[8])
                                    count_people[3]++
                                    break;

                                case (number > 55 && number <= 65):
                                    sum[4] += toFloat(Object.values(database[i])[8])
                                    count_people[4]++
                                    break;

                                default:
                                    console.log('.');
                            }
                        }

                function toFloat(str) {
                    return parseFloat(str.slice(1, -3));
                }
                console.log(sum)
                console.log(count_people)
                for (let i = 0; i < 5; i++) {
                    sum[i] = sum[i] / count_people[i];
                    sum[i] = parseInt(sum[i])
                }


                var ctxx = document.getElementById('myCharttt').getContext('2d');
var chartxx = new Chart(ctxx, {
  // wykres liniowy
  type: 'line',
  data: {
    labels: ['18 - 25', '25 - 35', '35 - 45', '45 - 55', '55 - 65'],
    datasets: [
      {
        type: 'line',
        label: 'Average income',
        backgroundColor: 'rgb(139,0,0)',
        borderColor: 'rgb(139,0,0)',
        data: sum,
        fill: false,
        yAxisID: 'y-axis-2'
      },
      // wykres slupkowy
      {
        type: 'bar',
        label: 'Number of people in the age group',
        backgroundColor: 'rgb(52,1,63)',
        borderColor: 'rgb(52,1,63)',
        data: count_people,
        fill: false,
        yAxisID: 'y-axis-1'
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          ticks: {
            fontColor: 'rgb(52,1,63)',
            borderColor: 'rgb(0,0,0)',
            beginAtZero: true
          }
        },
        {
          id: 'y-axis-2',
          position: 'right',
          ticks: {
            fontColor: 'rgb(139,0,0)',
            beginAtZero: true
          }
        }
      ],
      xAxes: [{
        ticks: {
          fontColor: 'black'
        }
      }]
    },
    legend: {
      position: 'bottom',
      labels: {
        fontColor: 'black'
      }
    }
  }
});





            });
