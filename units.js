import _ from 'lodash'
import * as A from 'algebrite'

const base_units = ['kg', 's', 'A', 'm', 'mol', 'bit', 'cd', 'dollar']

// WARNING: no negative exponents! 
const derived = [
    [['cyc'], '1'],
    [['~rad', 'radian'], 'cyc/(2 * pi)'],
    // [['~sr', 'steradian'], '1'],
    [['gradian', 'grad'], 'cyc/400'],
    [['sextant'], 'cyc/6'],
    [['quadrant'], 'cyc/4'],
    [['rpm'], 'cyc/min'],

    [['deg'], 'cyc/360'],
    [['arcmin'], 'deg/60'],
    [['arcsec'], 'arcmin/60'],
    [['ha', 'hectare'], 'hm^2'],

    [['pct'], '1/100'],
    [['ppm'], '1/10^6'],
    [['ppb'], '1/10^9'],
    [['ppt'], '1/10^12'],
    [['ppq'], '1/10^15'],
    [['score'], '20'],

    [['~hertz', '~Hz'], 'cyc/s'],
    [['~newton', '~N'], 'kg * m / s^2'],
    [['~pascal', '~Pa'], 'N/m^2'],
    [['~joule', '~J'], 'N*m'],
    [['~watt', '~W'], 'J/s'],
    [['~coulomb', '~C'], 'A*s'],
    [['~volt', '~V'], 'W/A'],
    [['~farad', '~F'], 'C/V'],
    [['~ohm', '~LaTeXOmega'], 'V/A'],
    [['~siemens', '~S', 'mho'], 'A/V'],
    [['~weber', '~Wb'], 'V*s'],
    [['~katal', '~kat'], 'mol/s'],
    [['~tesla', '~T'], 'Wb/m^2'],
    [['~henry', '~H'], 'Wb/A'],

    [['~gram', '~g'], 'kg/1000'],
    [['~second', '~sec'], 's'],
    [['~meter', '~metre'], 'm'],
    [['~ampere', '~amp'], 'A'],
    // [['~candela'], 'cd'],
    // [['lumen', 'lm'], 'cd*sr'],
    // [['lux', 'lx'], 'lm/m^2'],

    [['~L', '~liter', '~litre'], 'dm^3'],
    [['~bar'], '100*kPa'],

    [['~dyne', '~dyn'], 'g*Gal'],
    [['~Gal', '~Galileo'], 'cm/s^2'],
    [['~erg'], 'dyn*cm'],

    [['dioptre'], '1/m'],

    [['minute', 'min'], '60*s'],
    [['hour', 'hr', 'h'], '60*min'],
    [['day', 'd'], '24*hour'],
    [['week'], '7*day'],
    [['year', 'yr'], '1461/4*day'], //'365.25*day'
    [['~annum'], 'year'],
    [['month'], 'year/12'],
    [['century'], '100*yr'],
    [['decade'], '10*yr'],
    
    [['angstrom'], 'nm/10'],
    [['micron'], 'um'],
    [['cc'], 'cm^3'],

    [['in', 'inch'], '254/100*cm'],
    [['ft', 'feet', 'foot'], '12*inch'],
    [['yd', 'yard'], '3*ft'],
    [['mi', 'mile'], '1760*yd'],
    [['fathom'], '6 * ft'],
    [['sqmi'], 'mi^2'],
    [['sqyd'], 'yd^2'],
    [['sqft'], 'ft^2'],
    [['sqin', 'sqinch'], 'in^2'],
    [['nmi', 'nautical_mile'], '1852*m'],
    [['knot'], 'nmi/hr'],
    [['pica'], 'inch/6'],
    [['point'], 'pica/12'],
    [['acre'], 'mi^2/640'],

    [['carat'], '200*mg'],

    [['~tTNT'], '4184/1000*GJ'],

    [['c'], '299792458*m/s'],
    [['~ly', 'lightyear'], 'c*yr'],
    [['au'], '149597870700*m'],
    [['parsec', 'pc'], 'au*648000/pi'],

    [['pi'], '3.14159265359'],

    [['~eV'], '1.6021766208/10^19 * J'],

    [['oz', 'ounce'], '28349523125/1000000000*g'],
    [['lb', 'pound'], '16*oz'],

    [['g_earth'], '9.80665*m/s^2'],

    [['lbf'], 'lb*g_earth'],
    [['kip'], '1000*lbf'],
    [['psi'], 'lbf/inch^2'],
    [['hp', 'horsepower'], '550*ft*lbf/s'],


    [['atm'], '101325*Pa'],
    [['mmHg'], '133322387415/1000000000*Pa'],
    [['Torr'], 'atm/760'],
    [['~cal', 'calorie'], '4184/1000*J'],
    [['~Cal', 'Calorie'], 'kcal'],
    [['~Wh'], 'W*hr'],
    [['~BTU'], '105505585262/100000000*J'],

    [['gal', 'gallon'], '231*inch^3'],
    [['quart', 'qt'], 'gal/4'],
    [['pt', 'pint'], 'qt/2'],
    [['cup'], 'pt/2'],
    [['floz'], 'cup/8'],

    [['mph'], 'mile/hr'],
    [['kph'], 'km/hr'],

    [['smoot'], '67*in'],
    [['firkin'], '90*lb'],
    [['fortnight'], '2*week'],
    [['furlong'], 'mi/8'],
    [['attoparsec'], 'parsec/10^18'],
    [['donkeypower'], 'horsepower/3'],
    [['sol_mars'], '88775.24409*s'],
    [['~pirateninja', '~PirateNinja'], 'kWh/sol_mars'],
    [['Friedman'], '6*month'],
    [['~warhol'], '15*minute'],

    [['U', 'rack_unit'], '1.75*inch'],
    [['hand'], '4*inch'],
    [['football_field'], '160*ft'],
    [['shot'], '3*Tbsp'],

    [['tsp'], 'floz/6'],
    [['Tbsp'], '3*tsp'],
    [['bbl'], 'hogshead/2'],
    [['hogshead'], '63*gallon'],
    [['gill'], '4*floz'],

    [['~byte'], '8*bit'],
]

const prefixes = [
    [["Yotta", "yotta", "Y"], 24],
    [["Zetta", "zetta", "Z"], 21],
    [["Exa", "exa", "E"], 18],
    [["Peta", "peta", "P"], 15],
    [["Tera", "tera", "T"], 12],
    [["Giga", "giga", "G"], 9],
    [["Mega", "mega", "M"], 6],
    [["Kilo", "kilo", "k"], 3],
    [["Hecto", "hecto", "h"], 2],
    [["Deca", "deca", "da"], 1],
    [["Deci", "deci", "d"], -1],
    [["Centi", "centi", "c"], -2],
    [["Milli", "milli", "m"], -3],
    [["Micro", "micro", "u"], -6],
    [["Nano", "nano", "n"], -9],
    [["Pico", "pico", "p"], -12],
    [["Femto", "femto", "f"], -15],
    [["Atto", "atto", "a"], -18],
    [["Zepto", "zepto", "z"], -21],
    [["Yocto", "yocto", "y"], -24]
]




global.parse_unit = parse_unit;

export function parse_unit(str){
    return str.replace(/[A-Za-z\_\+\-]+/g, function(unit){
        if(base_units.includes(unit)){
            return unit; // base units are self quoting
        }
        return '(' + parse_unit(parse_atom(unit)) + ')'
    })
}

function parse_atom(str){
    for(var [suffix, pow] of match_prefix(str)){
        var def = match_name(suffix);
        // console.log(suffix, pow, def)
        if(def){
            if(pow == 0) return def;
            if(pow > 0) return Math.pow(10, pow) + ' * ' + def;
            if(pow < 0) return def + ' / ' + Math.pow(10, -pow);
        }
    }
    throw new Error('unparseable atom ' + str);
}

function match_name(str){
    var sn = str.replace('~', '')
    if(base_units.includes(sn) && sn != 'kg') return sn;

    for(var [names, def] of derived){
        for(var name of names){
            if(name == str){
                return def
            }
        }
    }
}

function* match_prefix(str){
    yield [str, 0];

    yield ['~' + str, 0];
    for(var [names, pow] of prefixes){
        for(var name of names){
            if(str.startsWith(name)){
                yield ['~' + str.slice(name.length), pow]
            }
        }
    }
}



const well_known_units = [
    "Pa*s",
    "N*m",
    "N/m",
    "W/m^2",
    "W/s",
    "J/kg",
    "J/m^3",
    "V/m",
    "C/m^3",
    "C/m^2",
    "F/m",
    "H/m",
    "C/kg",

    "Hz",
    "N",
    "Pa",
    "J",
    "W",
    "C",
    "V",
    "F",
    "LaTeXOmega",
    "S",
    "Wb",
    "T",
    "H",
]


export const well_known_dict = _.fromPairs(well_known_units.map(function(text){
    try {
        var unit = A.eval(parse_unit(text).replace(/([A-Za-z]+)/g, '"$1"'))
        return [unit.toString(), text]
    } catch (err) {
        console.error(err)
    }
}))


var ONE = A.parse(1);


export function extract_units_core(x){
    if(!has_units(x)){
        return ONE
    }else if(A.ismultiply(x)){
        var terms = Array.from(listify(x)).slice(1);
        return A.multiply(...terms.filter(has_units).map(extract_units_core))
    }else if(is_unit(x)){
        return x
    }else if(A.ispower(x)){
        if(!A.isnum(A.caddr(x))) throw new Error('non numerical power');
        return A.power(extract_units_core(A.cadr(x)), A.caddr(x))
    }
    throw new Error('unhandled operation')
}


export function extract_units(x){
    try {
        return extract_units_core(x)
    }catch(err){
        return ONE
    }
}

export function is_unit(x){
    return A.isstr(x) && base_units.includes(x.str)
}

export function has_units(x){
    if(A.iscons(x)){
        return has_units(A.car(x)) || has_units(A.cdr(x))
    }else if(is_unit(x)) {
        return true
    }
    return false
}


function* listify(cons){
    while(cons.k == A.CONS){
        yield A.car(cons)
        cons = A.cdr(cons)
    }
}
