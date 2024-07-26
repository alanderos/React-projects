import { useState } from "react"


export function TwitterFollowCard({children, userName = 'Default',initialIsFollowing}){
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    console.log('[TwitterFollowCard] render with userName:', userName)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    return (
        <article className='tw-followCard' /*style={{display:"flex",alignItems: 'center', color:'#fff'}}*/>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar' 
                alt="Avatar usuario"
                src={`https://unavatar.io/${userName}`}/>
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    {text}
                    <span className="tw-followCard-stopFollow ">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}