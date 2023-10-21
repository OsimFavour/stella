import React, {useEffect, useState, useReducer} from 'react'
import {useImmerReducer} from 'use-immer'

function ReducerTest() {
    const initialState = {
        appleCount: 1,
        bananaCount: 10,
        message: 'Hello',
        happy: false
    }

    function ReducerFunction(draft, action) {
        switch(action.type) {
            case 'addApple':
                draft.appleCount = draft.appleCount + 1
                break        
            case 'changeEverything':
                draft.bananaCount = draft.bananaCount + 10
                draft.message = action.customMessage
                draft.happy = true
                break
        }
    }

    // const [state, dispatch] = useReducer(ReducerFunction, initialState)
    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)

    return (
        <>
            <div>Right now the count of apple is {state.appleCount}</div>
            <div>Right now the count of banana is {state.bananaCount}</div>
            <div>Right now the message is {state.message}</div>
            {state.happy ? (<h1>Thank you for being happy</h1>) : (<h1>Abdel is not a happy guy</h1>)}
            <br/>
            <button onClick={() => dispatch({ type: 'addApple' })}>Add Apple</button>
            <br/>
            <button 
                onClick={() => 
                    dispatch({ 
                        type: 'changeEverything',
                        customMessage: 'coming from the dispatch' 
                        })}>Change Everything
            </button>
  
        </>
    )
}

export default ReducerTest