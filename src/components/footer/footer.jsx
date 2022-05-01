import React from 'react'
import './footer.scss'

export default function Footer(){
    return(
        <div className="footer">
            <div className="copyright">© 2022 Copyright - LisaPMunich</div>
            <div className="attribution"> Images and Icons - &nbsp;
                <span>
                    <a target="_blank" style={{color: "#45A29E"}} href="https://icons8.com/icon/9190/bear">Bear</a>
                    icon by
                    <a target="_blank" style={{color: "#45A29E"}} href="https://icons8.com">Icons8</a>
                    ,&nbsp;
                </span>
                <span>
                    movie poster by several authors on <a target="_blank" style={{color: "#45A29E"}} href="https://unsplash.com">Unsplash</a>
                </span>
            </div>
        </div>
    )
}