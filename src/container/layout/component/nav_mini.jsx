import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBagShopping,
    faLocationDot,
    faUser,
    faUserCog,
    faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../slices/AuthSlice";
import { useState } from "react";

function NavbarMini() {
    const { user } = useSelector((state) => state.authReducer);
    const [t] = useTranslation("app");
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const handleActive = (currentPath, paramPath) => {
        return currentPath == paramPath;
    };
    const location = useLocation();
    const listLinks = ["/admin/user-manager", "/address-manager", "/orders"];

    const navLinks = [
        { id: 1, title: t("user_profile"), to: "/user-profile", icon: faUser },
        {
            id: 2,
            title: t("Admin"),
            to: "/admin/user-manager",
            icon: faUserCog,
            isAdminOption: true,
        },
        { id: 3, title: t("orders"), to: "/orders", icon: faBagShopping },
        {
            id: 4,
            title: t("address_manager"),
            to: "/address-manager",
            icon: faLocationDot,
        },
        {
            id: 5,
            title: t("logout"),
            to: "",
            icon: faSignOut,
            isLogoutButton: true,
        },
    ];
    const NavLink = ({ item, children }) => {
        return (
            <li>
                <Container item={item} children={children} />
            </li>
        );
    };
    const Container = ({ item, children }) => {
        if (item?.isLogoutButton) {
            return (
                <a
                    className="flex py-2 justify-start items-center"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                >
                    {children}
                </a>
            );
        } else {
            if (item?.isAdminOption) {
                if (user.authorities.name == "ROLE_ADMIN") {
                    return (
                        <Link
                            to={item?.to}
                            className="flex py-2 justify-start items-center"
                            style={{
                                color: handleActive(location.pathname, item.to)
                                    ? "#ff8871"
                                    : "black",
                            }}
                        >
                            {children}
                        </Link>
                    );
                }
            } else {
                return (
                    <Link
                        to={item?.to}
                        className="flex py-2 justify-start items-center"
                        style={{
                            color: handleActive(location.pathname, item.to)
                                ? "#ff8871"
                                : "black",
                        }}
                    >
                        {children}
                    </Link>
                );
            }
        }
    };
    const Children = ({ data }) => {
        return (
            <>
                <FontAwesomeIcon
                    icon={data?.icon}
                    style={{ fontSize: "20px" }}
                    color={
                        data?.font?.color ||
                        handleActive(location.pathname, data.to)
                            ? "#ff8871"
                            : "black"
                    }
                />
                <span style={{ color: data?.font?.color }} className="px-2">
                    {data.title}
                </span>
            </>
        );
    };
    return (
        <ul>
            {navLinks.map((link, index) => {
                let isAdmin = user.authorities.name == "ROLE_ADMIN";
                return (
                    <NavLink item={link} children={<Children data={link} />} />
                );
            })}
        </ul>
    );
}

export default NavbarMini;
