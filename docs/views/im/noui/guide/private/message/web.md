---
platforms:
  - {name: 'ios', text: 'iOS', link: './ios'}
  - {name: 'android', text: 'Android', link: './android'}
  - {name: 'web', text: 'Web', link: './web'}
  - {name: 'miniprogram', text: '小程序', link: './miniprogram'}
languages:
  - {name: 'java', text: 'Java', link: './java'}
  - {name: 'node', text: 'Node.js', link: './node'}
---

[[toc]]

#### 功能描述

Plantuml blow:
 
@startuml Sequence
 
Alice -> Bob: Hi
Bob -> Alice: Hi ACK
 
@enduml

@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml