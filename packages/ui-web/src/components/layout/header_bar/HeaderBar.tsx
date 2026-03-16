import React, { forwardRef, useState } from "react";
import type { HeaderBarProps } from "./HeaderBar.type";
import "./HeaderBar.css";

export const HeaderBar = forwardRef<HTMLElement, HeaderBarProps>(
function HeaderBar(
{
as: Tag = "header",
logo,
logoHref,
title,
links,
nav,
actions,
className = "",
onMenuToggle,
defaultMenuOpen = false
},
ref
) {

const [menuOpen, setMenuOpen] = useState(defaultMenuOpen);

const toggleMenu = () => {
const next = !menuOpen;
setMenuOpen(next);
onMenuToggle?.(next);
};

return (
<Tag
ref={ref}
className={`brick-header ${className}`}
data-open={menuOpen}
>

<div className="brick-header-container">

<div className="brick-header-left">

{logoHref ? (
<a href={logoHref} className="brick-header-logo">
{logo ?? title}
</a>
) : (
<div className="brick-header-logo">
{logo ?? title}
</div>
)}

<nav className="brick-header-nav">

{nav ? nav : (

<ul>

{links?.map((l,i)=>(
<li key={l.key ?? i}>
<a
href={l.href}
aria-current={l.current ? "page" : undefined}
>
{l.label}
</a>
</li>
))}

</ul>

)}

</nav>

</div>

<div className="brick-header-actions">
{actions}
</div>

<button
className="brick-header-burger"
onClick={toggleMenu}
aria-expanded={menuOpen}
>

<span/>
<span/>
<span/>

</button>

</div>

<div className="brick-header-overlay" onClick={toggleMenu}/>

<div className="brick-header-mobile">

{links?.map((l,i)=>(
<a
key={l.key ?? i}
href={l.href}
className="brick-header-mobile-link"
>
{l.label}
</a>
))}

{actions}

</div>

</Tag>
);

});