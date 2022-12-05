import logging


def work():
    for i in range(1,100):
        logging.info("taking info logs")
        logging.trace("taking trace logs")
        print(i)
        
        
work()