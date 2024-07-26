import './App.css'
import { useState } from 'react'
import { TwitterFollowCard } from './TwitterFollowCard'




const users = [
    {
        userName: 'midudev',
        name: 'Miguel Angel Duran',
        isFollowing: true
    },
    {
        userName: 'pheralb',
        name: 'Pablo H.',
        isFollowing: false
    },
    {
        userName: 'PacoHdezs',
        name: 'Paco Hdezs',
        isFollowing: true
    },
    {
        userName: 'TMChein',
        name: 'Tomas',
        isFollowing: false
    }
]


export function App(){
    //const [name,setName] = useState('midudev')
    //const [name,setName] = useState('pheralb')
    //console.log('Render with name:', name)
   
    return (
        <section className='App'>
            {
                users.map(user =>{
                    const {userName,name,isFollowing} = user
                    return (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                            name
                        >{name}</TwitterFollowCard>
                    )
                })
            }
        </section>
        
    )
}