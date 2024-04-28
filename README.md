<img src="https://www.grax.com/wp-content/uploads/2023/03/Profile-Yt-256x256.png" align="right" height="40" width="40" >

## GRAX Connector Framework

The GRAX Connector Framework is used by all GRAX connectors that need to execute snapshot reports to make them easily done. The goal is to ensure that all snapshot logic executed in all connectors is unified ensuring data experience is the same across multiple mediums. If you are updating the framework you must ```npm update``` packages below, test, and validate changes.

### Used By
* [grax-connector-for-excel](https://github.com/graxlabs/grax-connector-for-excel/)
* [grax-connector-for-tableau](https://github.com/graxlabs/grax-connector-for-tableau)
* [grax-connector-for-google] - Needs to be updated
* [grax-connector-for-snowflake] - Development
* [grax-connector-for-powerbi] - Development
* [grax-connector-for-outsystems] - Development
* [grax-connector-for-synapse] - Development
* [grax-connector-for-athena] - Development


#### Testing 
export GRAX_URL=```<GRAXURL>```
export GRAX_TOKEN=```<GRAXTOKEN>```





