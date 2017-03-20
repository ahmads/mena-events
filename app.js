
var tmp = '<a href="{link}" target="_blank">' +
  '<h1>{title}</h1>' +
  '<p>🗓 {date}</p>' +
  '<p>📍 {location}</p>' +
  '<p class="description">{description}</p>' +
  '</a>'

function wrap (ev) {

  return function (col) {
    
    return ev['gsx$' + col]['$t']
  }
}

function dateRangeString (startDate, endDate) {
  
  var locale = 'en-US'
  var format = {month: 'short'}

  var compo = []
  
  compo.push(startDate.toLocaleString(locale, format))
  compo.push(startDate.getDate())

  if (endDate.getTime() != startDate.getTime()) {
    compo.push('–')
    
    if (startDate.getMonth() != endDate.getMonth()) {
      compo.push(endDate.toLocaleString(locale, format))
    }

    compo.push(endDate.getDate())
  }

  compo.push(',')
  compo.push(startDate.getFullYear())
  
  return compo.join(' ')
}

function load (data) {

  data.feed.entry.forEach(function(ev) {

    var get = wrap(ev)

    var startDate = new Date(get('startdate'))
    var endDate = new Date(get('enddate'))

    if (endDate < Date.now()) {
      return;
    }

    var li = document.createElement('li')
    li.innerHTML = tmp.replace('{title}', get('name'))
      .replace('{link}', get('link'))
      .replace('{date}', dateRangeString(startDate, endDate))
      .replace('{location}', get('location'))
      .replace('{description}', get('description'))

    document.querySelector('.event-list').appendChild(li)
  })
}