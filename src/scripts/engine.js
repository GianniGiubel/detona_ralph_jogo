const state = {
    views: {
        square: (document.querySelectorAll('.square')),
        enemy: document.querySelector('.enemy'),
        time_left: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        life: document.querySelector('#life'),
        table: document.querySelector('#table'),
    },
    values: {        
        gameVelocity: 1000,
        hitPosition:0,
        result:0,
        resultRank:[],
        currentTime:60,
        vidas:3,
    },
    actions: {
        timerId: setInterval(randomSquare,600),
        coutDownTimerId: setInterval(countDown,1000),
    }
}

function addScoreRank() {
    state.values.resultRank.push(state.values.result)
    state.values.resultRank.sort(function(a,b){
        return b - a
    })    
    state.values.resultRank.map((element,index) => { 
        index++        
        state.views.table.innerHTML += `<p>${index} - ${element}</p>`
    }) 
}

function countDown() {
    state.values.currentTime--
    state.views.time_left.innerHTML = state.values.currentTime

    if(state.values.currentTime < 0) {
        clearInterval(state.actions.coutDownTimerId)
        clearInterval(state.actions.timerId)
        alert(`Game Over!Seu tempo acabou, sua pontuação foi de: ${state.values.result}`)
        addScoreRank()    
    }
}

function playSound(audioName) {
    let audio = new Audio(`../src/audios/${audioName}.m4a`)
    audio.volume = 0.1
    audio.play()
}

function randomSquare( ) {
    state.views.square.forEach((square) => {
        square.classList.remove('enemy')
    })

    let randomNumber = Math.floor(Math.random()*9)
    let randomSquare = state.views.square[randomNumber]
    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox () {
    state.views.square.forEach((square) => {
        square.addEventListener("click",(event)=>{
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.views.score.innerHTML = state.values.result
                state.values.hitPosition = null
                playSound('hit')
            } else {
                state.values.vidas--
                state.views.life.innerHTML = `X${state.values.vidas}`
                if(state.values.vidas == 0) {
                    clearInterval(state.actions.coutDownTimerId)
                    clearInterval(state.actions.timerId)
                    alert("Game Over!Suas vidas Acabaram!")
                    addScoreRank()
                }
            }
        })
    })
}

function main() {    
    addListenerHitBox()
}

main()