console.log("Hi iam here")
const valueOne = document.querySelector("#valueOne")
const valueTwo = document.querySelector("#valueTwo")
const valueThree = document.querySelector("#valueThree")
const valueFour = document.querySelector("#valueFour")
 var l = 0
// console.log(val)

window.addEventListener("scroll", () => {
    // for page detection
    const one = document.querySelector('.One')
    const two = document.querySelector('.Two')
    const three = document.querySelector('.Three')
    const four = document.querySelector('.Four')
    
    const linkone = document.getElementById('linkOne')
    const linktwo = document.getElementById('linkTwo')
    const linkthree = document.getElementById('linkThree')
    const linkfour = document.getElementById('linkFour')

const elvOne = one.getBoundingClientRect()
const elvTwo = two.getBoundingClientRect()
const elvThree = three.getBoundingClientRect()
const elvFour = four.getBoundingClientRect()

const offSet = 110
// const x = elvOne.y + elvOne.height

console.log(elvOne.y , elvOne.height)
// // if(x >= offSet && x <= elvOne.height  ) {
// //     console.log("Elev One")
// // }


if(elvOne.y + elvOne.height >= offSet && elvOne.y + elvOne.height <= elvOne.height+ offSet ) {
    linkone.style.backgroundColor = "black"
    linkone.style.color = "white"
} else {
    linkone.style.backgroundColor = "#f2f1f1"
    linkone.style.color = "black"
}


if(elvTwo.y + elvTwo.height >= offSet && elvTwo.y + elvTwo.height <= elvOne.height + offSet) {
    linktwo.style.backgroundColor = "black"
    linktwo.style.color = "white"
} else {
    linktwo.style.backgroundColor = "#f2f1f1"
    linktwo.style.color = "black"
}

if(elvThree.y + elvThree.height >= offSet && elvThree.y + elvThree.height <= elvOne.height + offSet) {
    linkthree.style.backgroundColor = "black"
    linkthree.style.color = "white"
} else {
    linkthree.style.backgroundColor = "#f2f1f1"
    linkthree.style.color = "black"
}

if(elvFour.y + elvFour.height >= offSet && elvFour.y + elvFour.height <= elvOne.height + offSet) {
    linkfour.style.backgroundColor = "black"
    linkfour.style.color = "white"
} else {
    linkfour.style.backgroundColor = "#f2f1f1"
    linkfour.style.color = "black"
}
    

    
    
    
    // for Current Subscriber 
    
    const height = window.innerHeight || document.documentElement.clientHeight
    const ele = document.querySelector('#scrolltobe')
    const val = ele.getBoundingClientRect()

    

    if(val.y - height/1.7 < 0 && l == 0) {
        
    
        for(let i = 0; i <= 300; i = i+10) {
            setTimeout(() => {
                valueOne.textContent = `${i}+`
            }, 8*i)
        }

        for(let i = 0; i <= 200; i = i+10) {
            setTimeout(() => {
                valueTwo.textContent = `${i}+`
            }, 10*i)
        }
        for(let i = 0; i <= 100; i = i+10) {
            setTimeout(() => {
                valueThree.textContent = `${i}+`
            }, 10*i)
        }
        for(let i = 0; i <= 20; i = i+10) {
            setTimeout(() => {
                valueFour.textContent = `${i}+`
            }, 10*i)
        }

         l = 1
    }
})