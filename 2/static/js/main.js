var alfabetMale = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v", "w", "x", "y","z", "ź", "ż"];
//console.log(alfabetMale.length)
var alfabetDuze = [];
alfabetMale.forEach(literka => alfabetDuze.push(literka.toLocaleUpperCase("pl")))
//console.log(alfabetDuze)
//console.log(alfabetDuze.length)

var palindrom = function (input)
{
    if (input.toLocaleLowerCase("pl") == input.split("").reverse().join("").toLocaleLowerCase("pl"))
    {
        return true
    }
    else
    {
        return false
    }
}

var szyfrCezar = function (input, shift)
{
    var ret = []
    var Arr = input.split("");
    for (let i = 0; i< Arr.length; i++)
    {
        if (alfabetMale.indexOf(Arr[i]) > -1 || alfabetDuze.indexOf(Arr[i]) > -1)
        {
            if (alfabetDuze.indexOf(Arr[i]) > -1)
            {
                let index = alfabetDuze.indexOf(Arr[i]);
                //console.log(index + " + " + shift)
                index += +shift;
                index %= 35;
                //console.log(index)
                ret.push(alfabetDuze[index]);
            }
            else
            {
                let index = alfabetMale.indexOf(Arr[i]);
                index += +shift;
                index %= 35;
                ret.push(alfabetMale[index]);
            }
        }
        else
        {
            ret.push(Arr[i])
        }
    }
    index =0;
    ret = ret.join("");
    return ret;
}

var deszyfrCezar = function (input, shift)
{
    var ret = []
    var Arr = input.split("");
    for (let i = 0; i< Arr.length; i++)
    {
        if (alfabetMale.indexOf(Arr[i]) > -1 || alfabetDuze.indexOf(Arr[i]) > -1)
        {
            if (alfabetDuze.indexOf(Arr[i]) > -1)
            {
                let index = alfabetDuze.indexOf(Arr[i]);
                index -= +shift;
                if (index < 0)
                {
                    index += 35;
                }
                ret.push(alfabetDuze[index]);
            }
            else
            {
                let index = alfabetMale.indexOf(Arr[i]);
                index -= +shift ;
                if (index < 0)
                {
                    index += 35;
                }
                ret.push(alfabetMale[index]);
            }
        }
        else
        {
            ret.push(Arr[i])
        }
    }
    index =0;
    ret = ret.join("");
    return ret;
}

var sprawdz = function ()
{
    let checkInput = document.getElementById("palindromInput").value;
    if(palindrom(checkInput))
    {
        document.getElementById("palindromInput").value = "Jest palindromem!";
    }
    else
    {
        document.getElementById("palindromInput").value = "Nie jest palindromem!"
    }
}

var zaszyfruj = function ()
{
    let cipherInput = document.getElementById("szyfrCezaraInput").value.toString();
    var shift = document.getElementById("przesuniecieSelect").value;
    if (cipherInput != "")
    {
        //console.log(cipherInput);
        //console.log(shift);
        //console.log(deszyfrCezar(cipherInput, shift));
        document.getElementById("szyfrCezaraInput").value = null;
        document.getElementById("deszyfrCezaraInput").value = szyfrCezar(cipherInput, shift);
    }
}
var odszyfruj = function ()
{
    let decipherInput = document.getElementById("deszyfrCezaraInput").value;
    var shift = document.getElementById("przesuniecieSelect").value;
    if (decipherInput != "")
    {
        //console.log(decipherInput);
        //console.log(shift);
        //console.log(deszyfrCezar(decipherInput, shift));
        document.getElementById("deszyfrCezaraInput").value = null;
        document.getElementById("szyfrCezaraInput").value = deszyfrCezar(decipherInput, shift);
    }
}