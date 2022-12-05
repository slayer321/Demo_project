from loguru import logger


def work():
    for i in range(1,100):
        logger.trace("taking trace logs")
        logger.info("taking info logs")
        print(i)
        
        
work()