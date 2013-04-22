var toChinese = function() {
    var UnitMap = {
        0 : '零',
        1 : '一',
        2 : '二',
        3 : '三',
        4 : '四',
        5 : '五',
        6 : '六',
        7 : '七',
        8 : '八',
        9 : '九'
    },
    BigUnitMap = {
        10 : '十',
        100 : '百',
        1000 : '千'
    };
    function getUnit(num) {
        var n = num.toString().split('');
        var units = function(n) {
            var ns = [];
            for (var i = 0,
            I = n.length; i < I; i++) {
                ns.push({
                    Unit: n[i],
                    BigUnit: ('1' + Array(I - i).join('0'))
                })
            }
            return ns
        } (n);
        var str = "",
        last;
        for (var i = 0,
        I = units.length; i < I; i++) {
            if (last != '0' || units[i].Unit != '0') {
                str +=
                function() {
                    var list = n.slice(i).join('');
                    if (i != 0 && list.match(/^0+$/i)) return '';
                    if (i == 0 && units[i].BigUnit == '10' && units[i].Unit == '1') return '';
                    return UnitMap[units[i].Unit]
                } () + (units[i].Unit != '0' && typeof BigUnitMap[units[i].BigUnit] != 'undefined' ? BigUnitMap[units[i].BigUnit] : '');
                last = units[i].Unit
            }
        }
        return str
    };
    return function(num) {
        num = num || 0;
        var str = num.toString().split('').reverse().join(''),
        reg = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/i,
        ex = reg.exec(str);
        var qian, wang, yi;
        if (ex[1]) qian = ex[1].split('').reverse().join('');
        if (ex[2]) wang = ex[2].split('').reverse().join('');
        if (ex[3]) yi = ex[3].split('').reverse().join('');
        var result = '';
        if (yi && yi.match(/[^0]/i)) {
            result = result + getUnit(yi) + '亿'
        }
        if (wang && wang.match(/[^0]/i)) {
            result = result + getUnit(wang) + '万'
        }
        if (!qian || !result || !qian.match(/^0+$/i)) {
            result = result + getUnit(qian)
        }
        return result
    }
} ();
