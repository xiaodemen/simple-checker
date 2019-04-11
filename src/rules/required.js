export default {
    name: 'required',
    config: {
        msg: '请填写'
    },
    validate(val, key, formData) {
        // `this` is Rule instance
        return val != null && val !== '';
    }
}
