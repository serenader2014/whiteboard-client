import moment from 'moment'

export default function parse(input) {
  return moment(input)
}

export function fromNow(input) {
  return parse(input).fromNow()
}

export function formatStandard(input) {
  return parse(input).format('MMMM Do YYYY, h:mm a')
}
