from loguru import logger


def work():
    for i in range(1,100):
        logger.info("taking info logs")
        logger.trace("taking trace logs")
        print(i)
        
        
work()