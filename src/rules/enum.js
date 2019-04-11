export default {
    name: 'enum',
    config: {
        val: [],
        msg: '请填写如下值之一: {{val}}',
    },
    validate(val, key, formData) {
        if (val == null || val === '') {
            return true;
        }
        let all = [].concat(this.getConfig('val'));
        return all.indexOf(val) >= 0;
    }
}
