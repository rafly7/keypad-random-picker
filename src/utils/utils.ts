class Utils {
    static getRandomInt(min: number, max: number) {
        const _min = Math.ceil(min);
        const _max = Math.floor(max);
        return Math.floor(Math.random() * (_max - _min + 1)) + _min;
      }
      
     static dropdownList: any[] = [10, 15, 20, 'Custom']
      
    static uniqFast(a: any) {
        const seen: any = {}
        const out = []
        const len = a.length
        let j = 0
        for (let i = 0; i < len; i++) {
          const item = a[i]
          if (seen[item] !== 1) {
            seen[item] = 1
            out[j++] = item
          }
        }
        return out
      }
      
      static dateTimeFormat() {
        const d = new Date()
        let month = d.getMonth().toString()
        let date = d.getDate().toString()
        let hours = d.getHours().toString()
        let minutes = d.getMinutes().toString()
        let seconds = d.getSeconds().toString()
        if (month.length < 2)
          month = `0${month}`
        if (date.length < 2)
          date = `0${date}`
        if (hours.length < 2)
          hours = `0${hours}`
        if (minutes.length < 2)
          minutes = `0${minutes}`
        if (seconds.length < 2)
          seconds = `0${seconds}`
        return `${d.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`
      }
      
}

export default Utils;
