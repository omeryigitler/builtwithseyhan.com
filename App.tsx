import React from 'react';

const bwsLogo = 'data:image/webp;base64,UklGRrLWAABXRUJQVlA4WAoAAAAQAAAAzwIA0AEAQUxQSAM/AAANj6IokqSmZpdoAP+usME7/1EQEdlHGzc6OR7wq+u9oBPZkR+K03DyReCLAEUguW0kSYLCmc6Imq7/PziX0F0hIpjUbI+7fvQ2M5TY2kQzAHQJVZf1Do1Cs0P9wgQIg05ic18W+HHTizYkA/21cJiCVVWOqOqe3njLWjv+x7inJRr2BRLq02bQHQUKNRFABlRZJBGrBgih6dfSdNKrY97cyo/PYCIIXZuXvK4HJdH3bThB6Js5DIYTnjWqKKlWLldjLa3tNtSgqe1BYi7tyIjqQ+2jQmw3vr5GQV+qNgpgcn4a6NfLW8vVhX4ASfSQBQRBQChnnDBzQwxA5yu1O5siLtjcYgDfjW9DO5lRgG/1QpSvW5LRefoMTW+e8QOCL8vjiYU/E0rS46wzNoL1cRiCf7PQByKfT6pq5LyABCoQOYR9PA1QQ4sGfjjRI8jHDClmyYtcOFQM1+vSl+5aMeH02V0FKDOmB6DPtOvROlrzHIAkzS2+gBcqUgBWFr0mCDiLAISnkCCKds5QVmVYn/0iEEXIw84tAN0VV/lMpufup0mtKmJT7SGj+b7dxhqQ1Bpws+QhUyU5IWnDjlLFmsPnWrYF3d3djO+27PGR4mHG5rvN2U+ObYau6SVxRHzbBecUKmqQu6LQr5JbSzESEEn7GGplq5aZnB5sQiDRVO+PcdMUIuHv1YZ4X5gBxAkWbY7BdT7hEDRGLGXQM/dRbXj0nTMiV9Z+zFTLV2vXUFw+H97DHuaOJgUP/abCe83DRzEo27maY7mpKy8S9hD2UH5SvIQ6mGwnlnGIB5Lx+4/IJ2E2YQGYbq5QXDCfBj6CDDG00sJ0rggOEVTRxORffVtNwo9N5DSYD0mpg4uX23sVqBxBpm4xvlxsQxgUFzZabT3QyXe4MczE3lvjKmErHpE+QbtMrYhu3NOdG5Y3gK5IMFmBc6aYDK3d8RiwnCAmg3BKzjZYE7YdOE2hVIv6ABfnx+QKWwDpoWEwS/N0QDwXCqdSyHYNOV2TfHtnrlpAM9w0GlkDcaYHXrbH4+A0GqykCzwlCxtUWHI6rOAnb5njt/wCzkp/djaNg1chxVwf17TrO6vgmqFNtZWgjiu5vOrUzSCfVc6JSmXOwvPP2dl2tDY6KvauciT7U+4Jxq29spgP+1t9CUYiB6VO6pGNcku3JrcxdlYCWMDwABC4oJSgI3QqZ/j8k1OKq85pVaptlUy2kRsZxdW1/NchgbPh4FoHNVB4LoPCnOf4C9j9+I0ZfnntEakq6uYlWOCN+f6g7sRUipM3+EkmmPRx2qvHD4VJXd2L3fSUegpa8VKCA2Ojky0NcKDLWFa6iQnqYOGXk9KMwn5dwOJgFqt2I3na9VBOzN7pPSPKY0tKJKXWW3AQEQQg7oNji0KG0jkcrABo+nyNRUs4DhL3lchCdwdR/P0b/T/kxkjA8vTMjDRR+xb0zhWL78ntH3u1Yew7m9ahzot13qccA5E5eBv1GxgrHm9rgWybYOQaFZCXDKm+8G9c/LXss5Tx1D3JPMZAZmcoMg05o5mFDSg5WDLUcV5ewYP1ijAbm1bsDbCivlYiYzbdvyjLmhMizczDQ1HXh4LKzZfsCFPBsyayAzMLvrwKBp1HzWqNuQku+AJQAk5tK2TCoAVDKw0yARZv5jFNBp43icnLW/sa8ttVsOswJ+4Yad2FsuV9be8+x9FD0U3gHApPTqVV+pS0gjAIr6yefG+WEQgEYSV8fMn2/1wM2nKe/hUK9sgYyu1IxXr+00SESESEfFt07pMvzSvGne3YzmITltAl/Lc1Xe7NxbZZVfe9AfOFW4YY3xNK/uQlpMvTe3B12BJ4Wy2eWMgawtJSQqmf0F0iJJ/p0C01gCjVdFEt5cKuoqHL6lWwYTfyLYq5IRXL1RV1VUcYa5OMY2pjgzuhzbR4Hsb0Q1Hd2srYylhBpW2crXu7g4zJ3DO5lDZvYlOYWmt+W4h32EV/WtBzdf1TyV3lA6QCUl90+WtAmCS5jJoKHeHzkfvsR7Ls5SAuQxaIMHw+xJaQEMNUuZsaRSP9csZb66cBWTX5R8TNiWgtwv8Tj5lgtXkzpsew8eAeJslE2soIa0nqEybYUN9yuMNmSlqvV9v/4Cts5lClPwbN56VGtL9TBzBw5RlKFNEbvFrZup+PZMg1fI9c6j+BamiW4ozudkzGm48oTXdNNsivqFk+Nn24PZUtD5hbPjXyfPPM56qn5ru6l65BQp3Z7QtFO1+LNPhbfL0rWwS3I6SlXYSk++BLumPeeIApHb5ia0pAsAqKFlAYwYBW0lJGf9e3B4/OWbD8bSUew0gMmnsUHGtLSFRytdBiJ59mA1BgHjLpMHa90q85g+bu4TA9A1jMhAYD50kThLzSIkkZsOyBmSCQAT78sZQE+vV3e3U5vMwC0r7iFCyVpXP9RpSpmtzuJg7rPZf5EZCdOdeCOsqjcDabZHWn84xRq7rs9F+D2JLn3A2nApn8RPc3MMm9J1KBNYjxtKJ72/AzjRklCZV5ULelwlI0ogLdGUqqpQQwtUcQTKsMZowPZQasUMw0KRmnsphIkyN/7sUQHiHmWr+hzZ0/Dx0yhY3mmkiznBgtHXO6seoj8x9MqIghyWc+ixpE28PEZmiQY9nzuG9O/zYk7V6Fnmh+4uc+OOJiS5R6qAsiMtQTLc7Hy6zhzLH0rErw+GmN2yol1XbGdOURvBjTXP7QW95NHRAb0RJxIq+ZQhDSYAy0EDrPXAEMhox5nmTwOtnJq5Q0Ubs9mKn5LM0nLnABAH/55jYjWWN0pVtWC0bi5q7kOByJpXa0uLSUZp5gQQiKddTR2jh6JBjRo7hBBF8E4x9dPE44Lsn29L8MaNMj64lX6FKRsr7o6/D0kLtye8cxIPIBWaF3Jvh+obVQsjCv3/lnGbESdi4e8Ziadtn/LxEIGYnTdWcl2iy5b00Gm6/lHKa/kh4YNRZ9kCcAPk2jfW+HrK3O5ZtnMfhEi45kt3tOPq6SzvSMrkX1c6ae5vJst7i1QJW/AQYPfZkfUSy0QV5/PvQGcQ9wEKUAlN5On6jCAk6mItKNaaCq3Ik6e1MHXteAWEUKVStoySEBk4pHU7PTC3PLB/S91vCx0gMmAu87XBHni9/iwZxtc23Gr2dWwMdhRzB6omjMMJgY3R+5ri4tt5DW0bHftnmVzeIE3Hvun7LN2Al0YFZqzyxwM3NCe6wSnQ5gCVOkkwOqvHGXps3fqYw6ctmaKUAjkXlf7cxr6wDJKSy1v/nC9RoaLsvxYMKnVowj10xLKdPSj5wXHohZYq/D73jEI42zmEE2S6v5C+P2MByZIQ5tx03wRJeYTyAPTvETUc2aTBgLZ++aAhCgfCTcM1HZeZuGG4Gx14bPoLMjnEBrUY/QdVHSYn+Cx3eJhmIK8tKRM9sAcinJwRh+aUTQfLuOGMdtkhBBH8f8Alno8M+u4l+cyRKS4rwCUK0nYiLuOYRtizPB+As86htOZH4jQ0N//7m0euJygNW+zssqddK0C5YM4iN6EHVE0C4H08lpnp5ahtKWAyk8XUXiB7ivYONIRxTpj1UOsv10HbbktESaLf20oBs4Gy4Bsx1bnOviiGaRohlRzXQ2iAR1C2SmKk8Y6NyRtga8FBbzYbzUgqNhtxUtVVycM7yCS6gzjpZQC93kNuUXT19XPALPgd6kkzEehTV3b5Jv75A6gYWuFfXjAiPyiDKFY9VSSjmyYXgMG2T7oW3paeW0pMSHDvd/P1FKybhncYXWUo1DSbBY/zpcGCdf+9xWQ+K58jLE3w34pPfGTuLyhVQwGZxw2ayfX7hAxSpRqYhiM1IATNWto640D8Jg72XXHPzmtQUQ+0ePUC26C+o7pi5NUPD56N87M8qMKr7nN9tTB9qJghBKi7YlIhIiIiIsMiqUiQXh6CnjnV2cNd6Vrg9jGTqv5lJsBmg/faiAt9g/+8lNvRcQtMVaiCJ2FFe8CSbxso3YjnT8JHnjY33TjFEgV18eVXPoB2Ww2oC3LyO9Go6ZwVVVmXEYrCQWBGn3kKt2c8gqi5C+0JFArLMKpFqNDORrOENwUkeFd2cw2cg63zqpzBGw1WNrSHrPbQgm1aZ+E4p23yKeQa3OStBJIWKPticfP8yNRHlWi1f4XSadQW99EG9LlwPOd0Yl3zSu7d0o9wTGJxg+ivA5qld0fNOHZaZ4Vf+wYdlm5eYQExzu02/dqG7+2YeoNRqnDQlcv7j/qeLz7MXQqlPMRB+mtUWW1SQjw5H/fZf4XQ1uhFTz3F7nhuUjsbFb78A1ReKfp3iXPMjA6OtCCEK1STASw5hkMJ/OgJ4zqwlZjBwUjsxqD87buLJK1XXtyNl6MIbH7S8BPMrEpg9C3FTrsuI8OdmsnSFNYLYNM68BiapXzsT72omFVU61hK2aUJgKKRd4zZGFy36XWZul6zFJG25M3U8W5OCdCJzi70pMq2b48x4KI1hDfIq7O/b3guN4Y5Qn5Y0KjUyALh5i04nykyn3vHbTCx+Nycbz+FqhZtQKZbJUUUitUVQREeEFlKqqKpGyqQRat6rV3/GlVMVmImnzepagTlC3Ew5L884c85BK4Sgwi/SiS0kZPoUTL2u0oFJssZQP4+uUQmltKZfeJhIBhnW8lFr0aR2caw7sbN9e/XOrE22e6nGOaEsAAqJOII5T4JnW2e2YtxElq9ay3tE+A+7bhxVBxap7Gm29iQyMfTlKd6znbKQo0W8hrS3e3MXXfPLGs9Oa8HUACmvgfpE5JTP8biT6f4nfNfJ7VXW1gBwBCz9941DCPN3x4lD7uOm9Gx5lD4O3Jnp6dYRbNQ65kAM4tKZtWxpDf1mlAk8SpGsRs7qDXehvR8GEGuAoOAiWlSaxkVIhnRtxkiE4ZwSPMtRsOiPfoAJGcsaP3d29FxRWGM7flKPuQZAXPpQ8GEaqjZrzjKTx0TIp0skuc62O7xSsC7kCxHGmH/C9PKqKklKi4X44aCh4ZSFUMK696Ww23vBtTV0dN0dO7atA4EHiu2lwDY/B+8Xq9tID9mIczXLaWPaaS8R0GLgHGQavTbc42f+bGVcBSSY8HrGy/jKhsER4Sg2b1X1kdfbORHvUIOC1ttE+Ja+nEX7gJm6SYZ2bIf/gdi/jIaBcq5357CZU75Llt0mCeXPKYPykWoFMv7lmWykyGnvrS0LL1VkgoggHewWy4PWbopYXH5dOOnOu4Z8Lhdceje9fGfTrEEmPfomSPV/3wlU59Hx5+NZFB5eGjHu0/VOL1dh7HohpkrrAvN5zkHf7t7QU+IyRp9atVBFRCdNMOH8ElEugNIlxR8/xGi/RgwawtpPhkNxbeyAv8VshnysSXDD1wGjkhC4WJ3FhyZnkHLZz8aG1zZUvf5BZMkSEP/DYxAdtAOx1D6zp24c6Bt1+rH2JcAtD+vgGmnrP8pmgFpWLRpH0nd9oFrX5l/SMNd49G8OZtDiu5rBQco2f66jt8RoL1oLKCR20YVbhEAXws06pNL4PKm0F4KzLYqwWwiM4OFQWBl5S1R/TDYACFKWPIG9SK2Q99ZnSIYH5JUYPKXlLMrTijUDTrFAWEixAMuoRk3GE8fF21ynp1uKLYc4mchZhnfVMW0ESQmUSvjLw8jgNEmgL2koQcEi/H3L+Nyrd9tyFEixLkEhvu75vAX8RIUjRyz8y0fYwrUOH9LiUT0SvuJJBnARMPpbZtN/i2+lLXNMfGXhaOOzDHc07wWaXNyQqeYYGlaFUWn1kaXvIAmogWtzAfAgEMEl1+UtH/ZeFYO8tYnAIMrBh4MI91Lx9a54B7XNof0B3y1KxAO94qQ9ZW1kVQmdvAwYVZcuR4d69w7E1rLDO1tHozP8LWxLvO6+GVl1j5SGLWKCbgeptjAAGgDoYO61FTWZi66wWQjDtGSweOePFd4VxcWHxSJvJssKHns5wbHiG8o2W7HlSBHmhCXkAjNDU6GIIt2zs3HVlGrs44DhL54cA6fKKxd+CnVNOdQP6dzpCOcn3NE56TqBbrjWE/vW7XIJfi7+mP7hTLOwWvZiOsjS4nMIQn2u1p4kWvEpwmOCrrR7yCUKOI+lycC7MOm1xF/2F9x/E58ApDUZUa/YISo3LC5c2aMLKQZ2rjTk0oQbqqyqvVmJyi8AxhIzhbQCx79YEHQBbQVfUlBoKgO1A2xoUN67sbLku8JfgJTgqH9iSI1EsLKo7KLShSVojk3pPoQWx/5aohyyZxB6+DJDKn2CfAxcFBw/PmaVy+1rMHlzWZp0mf81eFBM5QC4QOT9Hz4x0cU4Nj77Pkb2/HgY7UhKdNbZYqnmAbDaUW0tQqWHjKUJQxhjYufM+A5y4WO7dJqxPXuYRKE1XRwD1rBsPUy0L6iESi6YZlElL6nVJvqEwURRrXpxSLIzuvJ7KxZ/2ev8XhLDZeQ+OW8RyVv5GqaF7KR1O2AWDiSvGoVPkdq4gf73nOBsBCBYMj9KUYKcQDV3d3GUDX5IPYBz3RzvPuUaczkdnx8tPReN9YqNOqcl/ykCnxCdY9J8fqKMhOXZ3zg5tINlTkn71d4/4FcxFM2Yi47iBf6nPgbDUSwsl5a5Nftl/17Sw7xXRPgl+Z4P7x65Kth5HM9NnFCetABe1XkvXV7J4FZFNl4TefIGJaPmwZg0E1dYT2PKp69QmKg0E8LEwgobwyZaAPJygRLdAy5Ac3HCkfeVTu40/r6CdGRA4ipFPfnG91OuAMwfk49OO6xHDiMYCjgtLZRtBp907S46WtHaEN3w3FxkCrgqQk9p3X4tZImOvS0+kAwn8eG5ErHZajw0Lxz7o4cMsNM47sQacGq+HGrWG2wK8kK7yB+wXsj8J9a12vUbkdyewIwPHXv1zqv5C6DTnSb4CzBLo6IpXsJu2tGNlgTuWBQM4/QNGABmO5k+a05PsPYdpYSFR8JL/L7lN66L6O544rSJdXI2BdXmAvY/Sj2I+BwF+WTT5svBgNgVyP+E0xppMnl0gL7798e+LTG8/s/YvUFz2dR9wEHHWjgOAkWZD4xILVbNv9WXXFzd4STcO5QpU/BUVlq6u8WRtCWuk8klF0hUqV8Zn7DhM2Jc01lQcHbFqqwf23QNxE5pQNVbHDP8CkYLdrdVx7iRhR88TOmYT5tTk5+CgLGryliFOpTkA6ekvrRGK3FP0d4LRW+VhdbtE5I0XEjNq5sqTlFu8CsHX5swld+HWjO1UFqZOfS6gSxiYvrD4sxBK45N/peXZ2bk+6jvnH7gIeGV/VLB6fiNoaLHy0nAQQwxBlpGTF78Q3mU2F+KUyOpgam3opSQlZxhpAz6Xncr6QOEewiIFPa6n06ohT77XvJND0ER6e4ZSLsqexZ6jbfv3tHTz2zI/tXOPHfNfZP1O8+dgX9UI9R8dZA4vFvnyT8tA+1xL/r3M2YZH0CoD/T82WKvmE/6kPbtbS2gntoL8XONcCqR2fyuGzSfb2gkTEpJT3fOrsJ6klzHyUD2eWzsk1/hDLAAdnTbn9hLR0xK+GwbSU+5ErHOVCmBwLFw+hCM1eqK6P7W1nWLOJEcKCQwZ1eRew++bEcIZ1Dx6aPBiyHaK+hpyFkH2W96Sgs03ODd3Jk4vN38CNjhUpffBT7HRBdI+kJKYcWt/5MvsgifAwzja6pi5TZ2sbWB+n7a5ZdlyCs2XLSoI4uLgsOB4/OpYeJ7A9LVaHu1dIQPtCAVF30lINNEBtQ8cM+y4In5PeYIr5FK7wnOq+jVBfc1FD25hbW6Yvl39Zg8jRz2Xl/JIyZvPNnsu7lPPNj7J0lr1wPrkxxmxvYssPnkS9LtbYayHHRCQ06Aod1+IKYDBofakZ5P40BTPYkYIWYWwIYZ4seUeH/aLXf7zqv30U55N+ssIclNbATWE3Kumqw6G8f+nJGt4oKgx+vSHp8pdFkSf16jTleKeBhZhfyJveefSSepjrL1Kf/UaMiDq96c0XXGPa4e2s2wFWZd0QjsbJ6uz6ZG7yt7/djynPNoLfGmXCvTBY3vj6RO7JffgS2UWuU88+zG5H+rc9GEYi8opRKJq0tA0A+6df7a5TCZAJqks4Vp4GqVRSV8uATZYWLZYwckvXHa9mPsyoLQD4dwpG21b6e0FbT3idK2xY9lcs51AL0cWoqqqkc/Wt0hZ5TdtnyqG6jiWvX4d2dZchBiOGMrHpJzHcq6KT6AcwEAgUyd7r0TB90aBCe/kV6K/uu8z4uQzsblqVlXXroDw2CBFpdyjHZ1F5y6rhCKC78+FMqO85mG8UrSvJbft0Jz84BItIw+eOZF2qgLl54Yh9UzQWFTQxsdHZjzYXbr9SwAiCxkjDwuKstORWLFZmVI1s7Fu4yZ4zAPRvN9KvY8ZE/bK4e+c72PnyVV8rg/1a83uUtRsH1XvrgjN81aMhWVQz9Mvy62IO5Qt84uIFeTuHhc9wMYAWjKSXcRUoKE4uvU3tsCjUJrta4g9S6rKeLYW22tQLZELx6AibHzK8tyNsclle9MqoT8GbwBVFWVU7w6lN6uSPwUxNk3K58xqV3yoRE8+uSVJjv4pHgPMZhhDAeRy37ZhtH0405BswWcUoB6sg4SGwmDwDRGb6XPUs75ZJLLX5l8KnXutILdpYzG2jCVZIkB3Th75+zECabMhNxM6kNjkkFrAk/cUPP9KmCR+rSvdaFHBnk12wEid80fP+h3d9Frkg09DKUUrRKIlxuLrcpNF8WrDHVld3P+mEBJCUv4JF7jYBkBIuipqKtlFIrsAy28yygzlyPzUhrLy42Lj/edX2f1ZU4NtnqYARqpAPymuf9sMD4W5JGV6zPtcv24bt35GFDo2/04lJ+0orAxGM/DuazxLKMhBqGF0XLZSqX7Wbu3GT8luO3Jg7N297jkHuQBIkl00WbpM60UnXOEEVcyESX8lMlN7aPX7v4Y1/eTNB+13rIp5JkFXwF9f32fl39f5kH17PtPkcyi+JmHc7sy7pZ380YfTTXL1PhHxEDSUvJVpPgRJdFBzHE/6SMJgKY71CyXCVIBt04z09LoDSrIiDZG9x2F+hqlsdQuql1Z07jtB6+t6w3/j7fugxJaXGCsRQnGVb+wo3H8UFThGUt1FjT91yEW39EwjLUpoCx6YQMaSfy1AAV5V5iMrC0l4ylMJkT5OtoWPydgzBA1jZgaRmMZUnwt+HvGkcA3HAZ3B3P4x4gy6jL6ANyKI6iw8NqoAa0d8kZUw0ySGSY+QBrdcNlu6duoyxbiBUl+1/Chpf0gW+sYG38eRWG7jcX0s6v55ipxF0yJJoGmWRWvNI7S7zKD1DzreJjDfkCk08BIEw40rgX3sGXQfx8sWJaU2q6AcV+RkeTDoEcdHvIn/LHXqd1oYaBzTVLu6LskYpFjllxkEes/4rgLljfbYtptvjGxGrwep3FfK7/sPBakzJEQziN4jUZEdgBQtUHvWPbJXgIoPR4EAIOpc2t66EbaKC/SCtOhhEN3AemA27BIZYU8GI4uLSwrO8mmOLjI8ru5UULFADpEESjgRlCB5K5vp8icn1vXETc0WXR9Fdu+qMofmc3OZ7LkPdQELdJE0jpQFXYVQ2lE/6SY/uLMIhDFDhvZCn3RrdQAaohPV36JQl2p3WGUXb16/UPT0pIH0JlaGNioZWY1q7iCpd//1dILbnuLg+XKPkFqmnL555RzQG81y9DhJcJSVS9+NTTEqNhoRxBr68n6qxNOVC27NoJmWnrdwfUt7x2x4YCDx5csLfQeHJY7SRhM+VRk4CWLMY/nG/fvcoWwUKOrmi09LY2BjeW/f6H7igC6hb2PU6vYPX7S4P+EdBUiqcVWvTA4kKoJ8Y7xKLLOVgwBDhrCNdet26L7bbGNrRb7QaE+lp+7DPw6S4vHUACvtABGwSrZBBqY4pn0f1YbDBDvuHsM1c4t26tv0RxBdkcFxirX+ew06J+XyTYP7I/kU3IOADJC8fsNtkz8JShhp7kyflR2mtfyMfmmsY3TG5S0F6dqbJICBEzfX0a6sqK5weOOYzjxuTDXi+hKmmKFRbtHQ67o6s1sfeUOts9t+et1OEirKWwd0Tm1uG5xYzz2h9c6Ap21SWTBSkFKYfb5BpuAAVH1aXJS2mqMbx1P13M5oNAuyV3uOfxw0tg9uBfnyCs/IIHGVLx32cwDQDWLDfp5VTEI8nooZWzDNOegY0/h9UgjV8E48W96f06DxdQn7AJK5tUbuH1IAg6OmkZ8mY8lYDy3cSCrxosz1shwwOEA2FsRvFC4oPJF+FTmm8n9vm7aEju2XmyAi2XSoK1Xpe0zYXevsSNOkJDbamjVYM8BJ42bGTg7XY1vbfSmgbs2Xd9WsK2c6A4Vy5v5BsBOkc7kC5Uk9gm+TWnzjufue0CuazW8jwuYx4WQ3HKlTAypNLxqbkPwGSpMmNmGQtyxwcYXQPD2pZkwVK/i0nWdUL0js1AHa+z+T0Y04q2mAVdp9/7AmWWaXnrr+5v+9XXCYCTRNpTfqi/W8Kmz42SNhM3Y3Xi1AI/PP7z2YNnnjLKTXXvswtAH5KgLYVn3xYdkVhqqoXkOou2vW8e+0/SY6/mD3S7tONfBAfoH+pFaN/7W0pZqm1PNfV/znHKbfovRFiF/sGC8sB8ZOPlvz9c3drk08dhAbITm56m78rwGvdlnETUr0s8+5JGvifL+P0E4m7O6gdTS1Bl1n7W9K0TLJKXR7tsL8xm7W4elz7zKlM2yJPMUtxEbitaf6IdD9i9CuF1VVmCnS/fjErKVljc40V9tBUhYbi6qmwq5OJskjEqzvUaODkZdmlPdO+9phkFfMtyeqyob9+8ft4/ut8cDTt+p94ZlOdoXihEIpzzm+/WO1JAbP29dB2Le2VyyQ7pWuDY3Vym3uZrO7s4OPsH+ddr3FzEbzKF+H1d30m/IMo2B0gQypnXfQz9Gs9Y8xmZEsB0eze3ULmOy+dhYvCpJskQ4Qx5cL4j1ocD5pa7wHpMj4K8D/hzyGTwRx6CGGIPQpfY5wbr2oNWY0tICbnAJ94hXM3KCjlcx+Lq9SpFdUdz56/4cSqJALt6RLDMbNs3vqPo+QesRD/3iYNi8sA9E3SLjfN4wG6csus7djTNDQfvr3+sgkKQllV+j5K++ByyDSeVx4hxaUR8q6O1k9N0xB0Kg0EElB2HkVsktqZHAJGGlXmGs+P0nmIijmd+7h3cjS85nzWGdCCzgF8tjoDTNZdKfDXHsn8R78T6PYz5zNdNqQZ6FkLk8ze9lE7S3C4l9zMTgBgWbajJMl+FYa9szpnrJh1jghQHleC+KFv5tuMzmrmL8IzmPlEJGhj1FDW6iv23mCDA/BJtZbivcPty/HU3n7GpI4x7UjvIaf90bDdpXkHNvVkPN/npXgQGy2UWQ0+GKBATxBIrPQG3XeKF7V1nciqME91hFN0Wv3PrazvHyf3EVWADJD6/kfQln9lu/T1veGMCdSncCK8/L0IxzEct3Mz+qQoOLKdzK2CKYvfH8sFrasDct39yBCZ/03TRZNp4gdHlZrT0zHEEgWyXe+bcLnvEgztWy4HfTqXwEsuMDzBRYw3B+olrQxw39R5SyUfxbHi4eS3j1BqMj+b3koR8maWE+RTtfpQwMkTaR0YdMrt6nRcPErT0XoB6URVtwz2M++V4HS2tU7Nuwu0h8eNFhtuZzmsPkeiiP30JzRl8k7SHu+Yc9fJ73Y7sSOjy8wNsC3D3u4+t4fwsljWOxUQa8+s5Y4pGsi5Z+nNV0XJnqXoFiDK0q9CrlpxMth+nVcSaJZUQ2Gq8Y4zvtH/ed3eXeNhHOU8i46wwVnX8lIa7dMcL0dAJ6A64cXnGg2TY3t6Ly16Z7jlmUfypwPlopA87c5HzwjrKhPAk3wEYlyKd0YZk72ob18Ug5hAt6TLMjNkAjYiTa4v3rEkVI0+Ah9aRBrzjsmCKuSbk4uX7aEZ5EsL5Ml+tVLS0qqItub8xT8fXXW/21A2fqIdHOltYGSpko9qJphfmwSkqeNNb+FoSvTPcXxBiGjuB8PbuaH18Gjl8daPzPHtI3IWB4ukpKrdFZu04jG6rX0wfmiN+QGctDRaUNUgPlsb2drhqGnr5ir0rvdX3wFw80y96m431Se0k6o7hC7Pjy0zsVbxb/FfTpuwEqlb7nTPuOZmXcQ7vaxkTDRm5S7bSPr8mkXb9vDDjW83a44mdCIcxFNH17JBpq7NgyldLDEoqLCQr+Pr6ZQ7aTVCVfIGqcvK+qE74HJzbX8Abmw/wJDyW4O3kbGJr0AkB7YxnQwcG41+JEXcULN8Sn6ml2eW+S1otRu2pLtGkhlpLPgfYYTDS0XIvVZ148l8xxmOKr8oP+vU2lLJq38I9x1KGt4+qUz6bmDsizt7JhPmZrM5RzBiNe3OOxG6w/VMRtmYyWItmmsqY+uaRVchRDbEEUF39XtxMlH0Ns3OZx1eNvI0csHqxXb71XiQr3bCdqPfDcxI1xB9MN14ZywsVHqU4qzqMTxZwlcP5Gj0d2JBEfJmNFCRwDOr0wdktbLKCoxPAPUg/M5ibOMrwuJw9YKeERfPxcgV83Gw5gTnYCqQxEtPlo9iTi0cqqqpnAFA+xTZNA0RF6bZA0QGUE/YEY0OE0Ex37iI+i+OYnfXjMHOPe44w4PR0grsyt3g/9uDU5e3UJHUAIQpbIJ+NdVX+M0QOuC+XdzB4Ew6WcsMMEZ3A/f1MKPbf/l8Wjvrkci+NyRtL0jxhhS+HVh09Npd61yMu81Zrf29Qs7lFV1qyF53X8v7o18RUoIiIhImDvgVjAIhB1NE7jfplW/VkZeK0f+szgHEyd3Fxc3EvbaLDMKQOFR/SvlpNwG2N94TXRbw8cqtMCZz6VW+bFrX0rpAypARcZsaXytcFcqe7RbyyivjdqCLSAyjoNDuzDmaCo3IkaIQWDKXXRFx3hu0Q0o5s0k1iMBlW00fx8Y3xDk3WsQ8N0tGd+Pt/5JyvQ5o9ylnz5yv/JAkEmjPXikvCRttSHob3qD//Qd/wZRl/Y7uStjBr6zbK+Js8J0G6hN96pM6i8L2lQb2NR90Ag/JMNs/kZsqUZDE+8OCfHmHuPQQGrDRCtfcCnoTzsKNr66+Zp9j4wMvH/2j8WfCILGVGRQqmoBh/XHqeBJQt7siqaicAlFApWPqfmVAqD3WXb27VxIrTdjbCE5NC0Ny9Bq5TdDDkG2jeJB6hECAa8Ug6UOClqv0nzz77776hB6fc1e8LNjXPeMOW3tZZQHJMa32sKgJK/B+YJ2Ky8qCeZd7D3jdg7zSu8dVNI2amY2MYwLqpSKVVXXubm6cmcGvsJGPCnz9GxNKvF2wHl55SkrKvcsIWPIBU4EjeGIYhUeAbJxImGbpnVtUtMzE83RY1kXXqX95HAkFOt2x3gVaXb7yrI5WdTsq7Kbs3ncIYnCBJoTUu2Y+Tmzpq8Mj7F3XMvh57qwBn/F//cfkIqrqz+QZuqQLv3VAA==';

const App: React.FC = () => {
  return (
    <main className="bws-page" aria-label="Built With Seyhan coming soon page">
      <style>{`
        :root {
          --black: #050505;
          --charcoal: #0d0d0d;
          --gold: #cdaa5a;
          --gold-strong: #d79a31;
          --warm-white: #f5f1eb;
          --soft-white: #dedad4;
          --muted: #8b857d;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          min-height: 100%;
          margin: 0;
          background: var(--black);
        }

        body {
          overflow-x: hidden;
        }

        .bws-page {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(28px, 4vw, 72px);
          color: var(--warm-white);
          font-family: Inter, Arial, Helvetica, sans-serif;
          background:
            radial-gradient(circle at 50% 43%, rgba(205, 170, 90, 0.18), transparent 34%),
            radial-gradient(circle at 50% 92%, rgba(205, 170, 90, 0.10), transparent 42%),
            linear-gradient(135deg, #000000 0%, #11100e 47%, #020202 100%);
        }

        .bws-page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.28;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.012) 1px, transparent 1px);
          background-size: 5px 5px;
        }

        .bws-page::after {
          content: "";
          position: absolute;
          inset: -18%;
          pointer-events: none;
          background: radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.45) 70%, rgba(0, 0, 0, 0.94) 100%);
        }

        .bws-shell {
          position: relative;
          z-index: 1;
          width: min(1120px, 92vw);
          min-height: min(760px, calc(100vh - 56px));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .bws-logo {
          display: block;
          width: clamp(300px, 38vw, 540px);
          max-width: 100%;
          height: auto;
          margin: 0 auto clamp(22px, 3vw, 38px);
          filter:
            drop-shadow(0 22px 22px rgba(0, 0, 0, 0.72))
            drop-shadow(0 0 18px rgba(205, 170, 90, 0.18));
        }

        .bws-brand {
          margin: 0;
          color: var(--warm-white);
          font-size: clamp(32px, 4.2vw, 68px);
          font-weight: 900;
          letter-spacing: clamp(8px, 1.15vw, 19px);
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
          text-shadow:
            0 5px 0 rgba(0, 0, 0, 0.45),
            0 18px 28px rgba(0, 0, 0, 0.62),
            0 1px 0 rgba(255, 255, 255, 0.25);
        }

        .bws-brand span {
          color: var(--gold);
          background: linear-gradient(180deg, #fff1bd 0%, #cdaa5a 44%, #946020 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: none;
        }

        .bws-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 2.2vw, 28px);
          width: min(760px, 92vw);
          margin-top: clamp(16px, 2vw, 24px);
          color: var(--gold);
          font-size: clamp(11px, 1.05vw, 16px);
          font-weight: 700;
          letter-spacing: clamp(4px, 0.62vw, 8px);
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .bws-subtitle::before,
        .bws-subtitle::after {
          content: "";
          height: 1px;
          flex: 1;
          max-width: 95px;
          background: linear-gradient(90deg, transparent, rgba(205, 170, 90, 0.95));
        }

        .bws-subtitle::after {
          background: linear-gradient(90deg, rgba(205, 170, 90, 0.95), transparent);
        }

        .bws-coming {
          margin: clamp(78px, 9vw, 118px) 0 0;
          color: var(--soft-white);
          font-size: clamp(52px, 7vw, 108px);
          font-weight: 300;
          letter-spacing: clamp(18px, 3.1vw, 52px);
          line-height: 0.95;
          text-transform: uppercase;
          white-space: nowrap;
          text-shadow:
            0 8px 0 rgba(0, 0, 0, 0.42),
            0 0 26px rgba(255, 255, 255, 0.08);
        }

        .bws-glow-line {
          width: min(420px, 58vw);
          height: 2px;
          margin-top: clamp(28px, 3vw, 40px);
          background: linear-gradient(90deg, transparent, rgba(205, 170, 90, 0.18), #fff2c6, rgba(205, 170, 90, 0.18), transparent);
          box-shadow:
            0 0 24px rgba(205, 170, 90, 0.72),
            0 0 3px rgba(255, 255, 255, 0.9);
        }

        .bws-footer {
          position: absolute;
          left: 50%;
          bottom: clamp(14px, 3vw, 42px);
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: minmax(80px, 240px) auto minmax(80px, 240px);
          align-items: center;
          gap: clamp(18px, 3vw, 34px);
          width: min(960px, 86vw);
          color: var(--muted);
          font-size: clamp(12px, 1vw, 15px);
          letter-spacing: 2.6px;
        }

        .bws-footer::before,
        .bws-footer::after {
          content: "";
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(205, 170, 90, 0.72));
        }

        .bws-footer::after {
          background: linear-gradient(90deg, rgba(205, 170, 90, 0.72), transparent);
        }

        .bws-credit {
          position: relative;
          white-space: nowrap;
        }

        .bws-credit::before,
        .bws-credit::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--gold-strong);
          box-shadow: 0 0 14px rgba(215, 154, 49, 0.8);
        }

        .bws-credit::before { left: -36px; }
        .bws-credit::after { right: -36px; }

        .bws-credit a {
          color: #f1bc5f;
          font-weight: 800;
          letter-spacing: 3px;
          text-decoration: none;
        }

        @media (max-width: 760px) {
          .bws-shell {
            min-height: calc(100vh - 56px);
          }

          .bws-logo {
            width: min(380px, 84vw);
          }

          .bws-brand {
            max-width: 94vw;
            font-size: clamp(28px, 8vw, 44px);
            letter-spacing: clamp(5px, 1.8vw, 9px);
            white-space: normal;
            line-height: 1.18;
          }

          .bws-subtitle {
            width: min(500px, 92vw);
            gap: 12px;
            font-size: 11px;
            letter-spacing: 3.2px;
            line-height: 1.35;
            white-space: normal;
          }

          .bws-coming {
            margin-top: 64px;
            font-size: clamp(40px, 12vw, 62px);
            letter-spacing: clamp(10px, 4vw, 18px);
            white-space: normal;
            line-height: 1.12;
          }

          .bws-footer {
            position: static;
            transform: none;
            display: block;
            width: 100%;
            margin-top: 54px;
            line-height: 1.8;
            letter-spacing: 1.7px;
          }

          .bws-footer::before,
          .bws-footer::after,
          .bws-credit::before,
          .bws-credit::after {
            display: none;
          }
        }
      `}</style>

      <section className="bws-shell">
        <img className="bws-logo" src={bwsLogo} alt="Built With Seyhan BWS logo" />

        <h1 className="bws-brand">
          BUILT <span>WITH</span> SEYHAN
        </h1>

        <div className="bws-subtitle">PERSONAL TRAINING &amp; COACHING</div>

        <div className="bws-coming">COMING SOON</div>
        <div className="bws-glow-line" aria-hidden="true" />

        <footer className="bws-footer">
          <span />
          <div className="bws-credit">
            Designed &amp; Developed by{' '}
            <a href="https://omeryigitler.com" target="_blank" rel="noreferrer">
              Ömer YİĞİTLER
            </a>
          </div>
          <span />
        </footer>
      </section>
    </main>
  );
};

export default App;
