export const extractFormData = form => Array
.from(form.elements)
.reduce((acc, { id, value }) => ({ [id]: value, ...acc }), {});