import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/bottom-nav.css'

const BottomNav = () => {
  const foodPartner = JSON.parse(localStorage.getItem("foodPartner"))
  const isFoodPartner = !!foodPartner

  const handleLogout = () => {
    localStorage.removeItem("foodPartner")
    window.location.href = "/"
  }

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

        {!isFoodPartner ? (
          <NavLink
            to="/user/login"
            className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'is-active' : ''}`
            }
          >
            <span>Login</span>
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="bottom-nav__item"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            <span>Logout</span>
          </button>
        )}

      </div>
    </nav>
  )
}

export default BottomNav