from loguru import logger


def work():
    for i in range(1,100):
        logger.info("taking info logs")
        logger.trace(f"taking trace logs{test}")
        logger.debug("taking debug logs")
        logger.warning("taking warning")
        print(i)
    print("ending")
    logger.info("outside logger")   

def test():
    print("test trace file")
        
work()
