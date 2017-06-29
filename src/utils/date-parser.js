import moment from 'moment'

export default function parse(input) {
  return moment(input)
}

export function fromNow(input) {
  return parse(input).fromNow()
}
