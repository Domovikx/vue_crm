export default customColorClass;

function customColorClass(type: string): string {
  return type === 'outcome' ? 'deep-orange lighten-5' : 'teal lighten-5';
}
