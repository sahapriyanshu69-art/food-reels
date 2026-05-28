import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/bottom-nav.css'

const BottomNav = () => {
  const foodPartner = JSON.parse(localStorage.getItem("foodPartner"))
  const isFoodPartner = !!foodPartner

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav__inner">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? 'is-active' : ''}`
          }
        >
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? 'is-active' : ''}`
          }
        >
          <span>Saved</span>
        </NavLink>

        {isFoodPartner && (
          <NavLink
            to="/partner-profile"
            className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'is-active' : ''}`
            }
          >
            <span>Profile</span>
          </NavLink>
        )}

      </div>
    </nav>
  )
}

export default BottomNav