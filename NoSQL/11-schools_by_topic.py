#!/usr/bin/env python3
"""
Where can I learn Python?
"""


def schools_by_topic(mongo_collection, topic):
    """
    Return the list of schools having a specific topic.

    Args:
        mongo_collection: the pymongo collection object
        topic (str): the topic searched

    Returns:
        list: the list of schools having the specified topic
    """
    return list(mongo_collection.find({"topics": topic}))
