import re

# Update App.jsx
path_app = 'src/App.jsx'
with open(path_app, 'r', encoding='utf-8') as f:
    content = f.read()

# For the stats banner, we are using GSAP stagger, so don't add data-aos, just remove reveal-on-scroll
content = content.replace('className="stats-banner-container reveal-on-scroll"', 'className="stats-banner-container"')

# For the skill category cards, replace reveal-on-scroll with data-aos
content = re.sub(r'className="skill-category-card glass-element reveal-on-scroll" style=\{\{ transitionDelay: \'(.*?)\' \}\}', r'className="skill-category-card glass-element" data-aos="fade-up" data-aos-delay="\1"', content)
content = content.replace('className="skill-category-card glass-element reveal-on-scroll"', 'className="skill-category-card glass-element" data-aos="fade-up"')

# For other sections
content = content.replace('reveal-on-scroll"', '" data-aos="fade-up"')
content = content.replace('reveal-on-scroll', '')

# Fix data-aos-delay strings (0.08s -> 80)
def delay_replacer(match):
    delay_str = match.group(1)
    if delay_str.endswith('s'):
        try:
            val = float(delay_str[:-1]) * 1000
            return str(int(val))
        except:
            pass
    return delay_str

content = re.sub(r'data-aos-delay="(.*?)"', lambda m: f'data-aos-delay="{delay_replacer(m)}"', content)

with open(path_app, 'w', encoding='utf-8') as f:
    f.write(content)

# Update index.css
path_css = 'src/index.css'
with open(path_css, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Delete .reveal-on-scroll blocks
css_content = re.sub(r'\.reveal-on-scroll\s*\{[^}]*\}', '', css_content)
css_content = re.sub(r'\.reveal-on-scroll\.revealed\s*\{[^}]*\}', '', css_content)

with open(path_css, 'w', encoding='utf-8') as f:
    f.write(css_content)

print('Updated App.jsx and index.css')
