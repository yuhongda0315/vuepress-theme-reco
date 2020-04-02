---
categorys:
  - name: '客户端'
    languages:
      - {name: 'ios', text: 'iOS', link: './ios'}
      - {name: 'android', text: 'Android', link: './android'}
      - {name: 'multi', groupName: 'web', children: [{name: 'web3', text: 'Web 3.0', isFire: true, link: './web3'}, {name: 'web', text: 'Web 2.0', link: './web'}]}
  - name: '服务端'
    languages:
      - {name: 'java', text: 'Java', link: './java'}
      - {name: 'php', text: 'PHP', link: './php'}
      
      - {name: 'nodejs', text: 'Node.js', link: './nodejs'}
      - {name: 'serverapi', text: 'Server API', link: './serverapi'}
---


[[toc]]

#### 功能描述{#intro-custom}

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