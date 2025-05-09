export const validationRules = {
  required: () => (value: string) => !!value || 'Поле обязательно',
  min: (min: number) => (value: string) => value.length >= min || `Минимум ${min} символов`,
}
