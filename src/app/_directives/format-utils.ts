export class FormatUtils {
    static DateToString(v: Date): string {
        if (!v)
            return '';
        let aux = new Date(v);
        return aux.toLocaleDateString('pt-BR');
    }
    static HourToString(v: Date): string {
        var date = new Date(v)
        return FormatUtils.FormatNumberLength(date.getHours(), 2) +
            ':' +
            FormatUtils.FormatNumberLength(date.getSeconds(), 2);
    }
    static DateDiff(a: Date, b: Date): number {
        var day1 = new Date(a).getTime();
        var day2 = new Date(b).getTime();
        return (+day1 - +day2);
    }
    static DaysBetween(a: Date, b: Date): number {
        var diffMs = Math.abs(this.DateDiff(a, b));
        return Math.round(diffMs / (1000 * 3600 * 24));
    }
    static FormatDateToEdit(a : Date) : string{
        let d = new Date(a);
        return d.toISOString().substring(0,10);
        // return FormatUtils.FormatNumberLength(d.getFullYear(), 4) +
        //     '-' +
        //     FormatUtils.FormatNumberLength(d.getMonth(), 2) +
        //     '-' +
        //     FormatUtils.FormatNumberLength(d.getDay(), 2);
    }
    static FormatNumberLength(num, length): string {
        var r = "" + num;
        while (r.length < length) {
            r = "0" + r;
        }
        return r;
    }
}
